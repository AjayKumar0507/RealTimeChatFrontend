import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChatHeader } from '../components/chat/chat-header';
import { EmptyChat } from '../components/chat/empty-chat';
import { MessageInput } from '../components/chat/message-input';
import { MessageList } from '../components/chat/message-list';
import { UserListItem } from '../components/chat/user-list-item';
import { Client , Stomp} from '@stomp/stompjs';
import SockJS from 'sockjs-client';


const apiURL = process.env.REACT_APP_API_URL;
const wsURL = process.env.REACT_APP_WS_URL;

const socket = new SockJS('https://cwave.onrender.com/ws');
const stompClient = Stomp.over(socket);

stompClient.connect({}, () => {
  // Subscribe to private messages
  stompClient.subscribe("/user/queue/private", (message) => {
    console.log("Private:", JSON.parse(message.body));
  });

  // Subscribe to group messages
  stompClient.subscribe("/topic/group/my-group-id", (message) => {
    console.log("Group:", JSON.parse(message.body));
  });
});


export default function ChatPage() {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState('');
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  // Retrieve user details from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const currentUser = {
    id: storedUser.username || 'user1', // Fallback if not found
    name: storedUser.name || 'Current User',
    avatar: storedUser.avatar || 'https://via.placeholder.com/40',
  };

    useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUserId) return;
      let response = "";
      console.log(selectedUser);
      try {
        if(selectedUser.type== 'user'){
          response = await axios.get(`${apiURL}/chat/private`,{
            params:{
              senderId:currentUser.id,
              recipientId:selectedUser.id,
            }
          });
        } 
        else{
          response = await axios.get(`${apiURL}/chat/group/${selectedUser.id}`);
        }   
        setMessages(response.data);
        console.log(response.data)
        setError('');
      } catch (err) {
        setError('Failed to fetch messages');
        console.error(err);
      }
    };

    fetchMessages();
  }, [selectedUserId]);

  const fetchUsersAndGroups = async () => {
    try {
      const token = localStorage.getItem("token");
      const [usersResponse, groupsResponse] = await Promise.all([
        axios.get(`${apiURL}/users/all`),
        axios.get(`${apiURL}/groups/all`),
      ]);

      const fetchedUsers = usersResponse.data;
      const fetchedGroups = groupsResponse.data;

      const filteredUsers = fetchedUsers
        .filter((user) => user.username && user.username !== currentUser.id)
        .map((user) => ({
          type:'user',
          id: user.username,
          name: user.username,
          avatar: user.avatar || 'https://via.placeholder.com/40',
          lastMessage: user.lastMessage || '',
          timestamp: user.timestamp || '',
          unreadCount: user.unreadCount || 0,
          isOnline: user.isOnline || false,
          isTyping: user.isTyping || false,
        }));


      const filteredGroups = fetchedGroups.filter(group =>
        group.memberUsernames.includes(currentUser.id))
        .map((group) => ({
          type:'group',
          id: group.name,
          name: group.name,
          avatar: group.avatar || 'https://via.placeholder.com/40',
          lastMessage: group.lastMessage || '',
          timestamp: group.timestamp || '',
          unreadCount: group.unreadCount || 0,
          isOnline: true, // Groups are considered "active" by default
          isTyping: group.isTyping || false,
        }));


      setUsers(filteredUsers);
      setGroups(filteredGroups);
      console.log(filteredUsers,filteredGroups);

      if (filteredUsers.length === 0 && filteredGroups.length === 0) {
        setError('No users or groups available. Please register users or create groups.');
      } else {
        setError('');
      }
    } catch (error) {
      setError('Failed to load users or groups: ' + error.message);
      console.error('Error fetching users/groups:', error);
    }
  };

  useEffect(() => {
    fetchUsersAndGroups();
  }, []);

  const selectedUser = [...users, ...groups].find(
    (item) => item.id === selectedUserId
  );

  const handleSendMessage = async (content) => {
    const newMessage = {
      id: `msg${messages.length + 1}`,
      senderId: currentUser.id,
      content,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setMessages([...messages, newMessage]);
    console.log(selectedUser);
    try {
      
      stompClient.send(
        `/app/${selectedUser.type === "user" ? "private" : "group"}`,
        {},
        JSON.stringify({
          senderId: currentUser.id,
          recipientId: selectedUser.id,
          groupId: selectedUser.name,
          content,
          delivered: true,
          read: true,
        })
      );
      console.log("Message sent");
    } catch (err) {
      setError(err?.message || "Message not sent");
    }
  };


  const handleGroupCreation = async () => {
    const selectedUsers = [...selectedUserIds, currentUser.id];
    console.log(selectedUsers);

    if (!groupName.trim()) {
      setError('Please enter a group name');
      return;
    }
    if (selectedUsers.length <= 1) {
      setError('Please select at least one user for the group');
      return;
    }

    try {
      const response = await fetch(`${apiURL}/groups/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: groupName.trim(), memberUsernames: selectedUsers }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Group creation failed: ${text} (HTTP ${response.status})`);
      }

      const newGroup = await response.json();
      console.log('Group created:', newGroup);


      setError('');
      setShowGroupForm(false);
      setGroupName('');
      setSelectedUserIds([]);
      fetchUsersAndGroups(); // Refresh list
    } catch (error) {
      setError(error.message);
      console.error('Group creation error:', error);
    }
  };

  return (
      <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-gray-200 overflow-y-auto md:block hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Chats</h2>
        </div>
        <div className="p-4 space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Users</h3>
            {users.length > 0 ? (
              users.map((user) => (
                <UserListItem
                  key={user.id}
                  {...user}
                  isSelected={selectedUserId === user.id}
                  onClick={setSelectedUserId}
                />
              ))
            ) : (
              <p className="text-gray-500 text-sm">No users available.</p>
            )}
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Groups</h3>
            {groups.length > 0 ? (
              groups.map((group) => (
                <UserListItem
                  key={group.id}
                  {...group}
                  isSelected={selectedUserId === group.id}
                  onClick={setSelectedUserId}
                />
              ))
            ) : (
              <p className="text-gray-500 text-sm">No groups available.</p>
            )}
          </div>

          {/* Group Creation UI */}
          <div className="mt-4">
            <button
              onClick={() => setShowGroupForm(!showGroupForm)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded"
            >
              {showGroupForm ? 'Cancel' : 'Create Group'}
            </button>

            {showGroupForm && (
              <div className="mt-4 space-y-2 text-sm">
                <input
                  type="text"
                  placeholder="Group Name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />

                <label className="block text-gray-700 font-medium">Select Users</label>
                <select
                  multiple
                  value={selectedUserIds}
                  onChange={(e) =>
                    setSelectedUserIds(
                      Array.from(e.target.selectedOptions, (option) => option.value)
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded h-32"
                >
                  {users
                    .filter((user) => user.id !== currentUser.id)
                    .map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                </select>

                <button
                  onClick={handleGroupCreation}
                  className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                  Create
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex flex-col flex-grow">
        {selectedUser ? (
          <>
            <ChatHeader
              name={selectedUser.name}
              avatar={selectedUser.avatar}
              isOnline={selectedUser.isOnline}
              isTyping={selectedUser.isTyping}
            />
            <MessageList
              messages={messages}
              currentUser={currentUser}
              selectedUser={selectedUser}
            />
            <MessageInput onSendMessage={handleSendMessage} />
          </>
        ) : (
          <EmptyChat />
        )}
      </main>
    </div>
  );
}
