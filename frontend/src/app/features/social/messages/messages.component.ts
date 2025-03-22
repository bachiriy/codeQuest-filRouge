import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

interface Friend {
  id: number
  username: string
  profilePic?: string
  status: "online" | "offline" | "away"
  lastMessage?: {
    text: string
    timestamp: Date
    isRead: boolean
    isFromMe: boolean
  }
}

interface Message {
  id: number
  senderId: number
  text: string
  timestamp: Date
  isRead: boolean
}

@Component({
  selector: "app-messages",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-4 md:p-6">
      <h1 class="text-2xl font-bold text-white mb-6">Messages</h1>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Contacts List -->
        <div class="lg:col-span-1">
          <div class="bg-[#1c2128] border border-gray-700 rounded-lg shadow-md overflow-hidden">
            <div class="p-4 border-b border-gray-700">
              <div class="relative">
                <input [(ngModel)]="searchQuery" 
                  class="w-full px-3 py-2 bg-[#0d1117] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search contacts"
                  (input)="filterContacts()">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 absolute right-3 top-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>
            
            <div class="overflow-y-auto max-h-[500px]">
              <div *ngFor="let contact of filteredContacts" 
                [ngClass]="{'bg-[#0d1117]': selectedContact?.id === contact.id}"
                class="p-4 border-b border-gray-700 last:border-0 hover:bg-[#0d1117] cursor-pointer transition"
                (click)="selectContact(contact)">
                <div class="flex items-center">
                  <div class="relative">
                    <div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                      {{ contact.username.charAt(0) | uppercase }}
                    </div>
                    <div *ngIf="contact.status === 'online'" class="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-[#1c2128]"></div>
                    <div *ngIf="contact.status === 'away'" class="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-yellow-500 border-2 border-[#1c2128]"></div>
                  </div>
                  <div class="ml-3 flex-1">
                    <div class="flex justify-between items-center">
                      <div class="text-white font-medium">{{ contact.username }}</div>
                      <div *ngIf="contact.lastMessage" class="text-xs text-gray-400">
                        {{ contact.lastMessage.timestamp | date:'shortTime' }}
                      </div>
                    </div>
                    <div class="flex justify-between items-center">
                      <div *ngIf="contact.lastMessage" class="text-sm text-gray-400 truncate max-w-[150px]">
                        <span *ngIf="contact.lastMessage.isFromMe">You: </span>
                        {{ contact.lastMessage.text }}
                      </div>
                      <div *ngIf="contact.lastMessage && !contact.lastMessage.isRead && !contact.lastMessage.isFromMe" 
                        class="w-2 h-2 rounded-full bg-blue-500">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div *ngIf="filteredContacts.length === 0" class="p-4 text-center text-gray-400">
                No contacts found
              </div>
            </div>
          </div>
        </div>
        
        <!-- Chat Area -->
        <div class="lg:col-span-2">
          <div *ngIf="!selectedContact" class="bg-[#1c2128] border border-gray-700 rounded-lg shadow-md overflow-hidden h-full flex items-center justify-center">
            <div class="text-center p-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-500 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <h2 class="text-xl font-medium text-white mb-2">Your Messages</h2>
              <p class="text-gray-400 max-w-md">
                Select a contact to start messaging or continue a conversation
              </p>
            </div>
          </div>
          
          <div *ngIf="selectedContact" class="bg-[#1c2128] border border-gray-700 rounded-lg shadow-md overflow-hidden flex flex-col h-[600px]">
            <!-- Chat Header -->
            <div class="p-4 border-b border-gray-700 flex items-center justify-between">
              <div class="flex items-center">
                <div class="relative">
                  <div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    {{ selectedContact.username.charAt(0) | uppercase }}
                  </div>
                  <div *ngIf="selectedContact.status === 'online'" class="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-[#1c2128]"></div>
                  <div *ngIf="selectedContact.status === 'away'" class="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-yellow-500 border-2 border-[#1c2128]"></div>
                </div>
                <div class="ml-3">
                  <div class="text-white font-medium">{{ selectedContact.username }}</div>
                  <div class="text-xs text-gray-400">
                    <span *ngIf="selectedContact.status === 'online'">Online</span>
                    <span *ngIf="selectedContact.status === 'away'">Away</span>
                    <span *ngIf="selectedContact.status === 'offline'">Offline</span>
                  </div>
                </div>
              </div>
              
              <div class="flex space-x-2">
                <button class="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </button>
                <button class="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M23 7l-7 5 7 5V7z"></path>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                  </svg>
                </button>
                <button class="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                  </svg>
                </button>
              </div>
            </div>
            
            <!-- Chat Messages -->
            <div class="flex-1 overflow-y-auto p-4 bg-[#0d1117]">
              <div *ngIf="getMessagesForContact(selectedContact.id).length === 0" class="flex items-center justify-center h-full">
                <div class="text-center">
                  <p class="text-gray-400">No messages yet</p>
                  <p class="text-gray-500 text-sm mt-1">Start the conversation by sending a message</p>
                </div>
              </div>
              
              <div *ngFor="let message of getMessagesForContact(selectedContact.id)" class="mb-4 last:mb-0">
                <div [ngClass]="{'flex justify-end': message.senderId === 1}">
                  <div [ngClass]="{
                    'bg-blue-600 text-white': message.senderId === 1,
                    'bg-[#1c2128] text-gray-200': message.senderId !== 1
                  }" class="max-w-[70%] rounded-lg px-4 py-2 shadow">
                    <div>{{ message.text }}</div>
                    <div class="text-xs mt-1 opacity-70 text-right">
                      {{ message.timestamp | date:'shortTime' }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Chat Input -->
            <div class="p-4 border-t border-gray-700">
              <div class="flex items-center">
                <button class="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                </button>
                <input [(ngModel)]="newMessage" 
                  class="flex-1 px-3 py-2 bg-[#0d1117] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type a message..."
                  (keyup.enter)="sendMessage()">
                <button (click)="sendMessage()" class="p-2 text-blue-500 hover:text-blue-400 hover:bg-gray-700 rounded-md transition ml-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class MessagesComponent implements OnInit {
  searchQuery = ""
  newMessage = ""
  selectedContact: Friend | null = null

  // Mock data
  contacts: Friend[] = [
    {
      id: 1,
      username: "coding_master",
      status: "online",
      lastMessage: {
        text: "Have you tried the new challenge?",
        timestamp: new Date("2023-05-15T14:30:00"),
        isRead: true,
        isFromMe: false,
      },
    },
    {
      id: 2,
      username: "alice_wonder",
      status: "away",
      lastMessage: {
        text: "I'll check it out later",
        timestamp: new Date("2023-05-15T10:15:00"),
        isRead: true,
        isFromMe: true,
      },
    },
    {
      id: 3,
      username: "dev_ninja",
      status: "online",
      lastMessage: {
        text: "That solution was brilliant!",
        timestamp: new Date("2023-05-14T18:45:00"),
        isRead: false,
        isFromMe: false,
      },
    },
    {
      id: 4,
      username: "bug_hunter",
      status: "offline",
      lastMessage: {
        text: "Thanks for the help with that bug",
        timestamp: new Date("2023-05-13T09:20:00"),
        isRead: true,
        isFromMe: false,
      },
    },
    {
      id: 5,
      username: "syntax_error",
      status: "offline",
      lastMessage: {
        text: "Let me know when you're free to pair program",
        timestamp: new Date("2023-05-12T16:10:00"),
        isRead: true,
        isFromMe: true,
      },
    },
  ]

  messages: Message[] = [
    {
      id: 1,
      senderId: 1, // Current user
      text: "Hey, how's it going?",
      timestamp: new Date("2023-05-15T09:30:00"),
      isRead: true,
    },
    {
      id: 2,
      senderId: 3, // dev_ninja
      text: "Good! Just finished that hard challenge on dynamic programming",
      timestamp: new Date("2023-05-15T09:35:00"),
      isRead: true,
    },
    {
      id: 3,
      senderId: 1,
      text: "Nice! I'm still working on it. Any tips?",
      timestamp: new Date("2023-05-15T09:40:00"),
      isRead: true,
    },
    {
      id: 4,
      senderId: 3,
      text: "Try using memoization to avoid recalculating the same subproblems",
      timestamp: new Date("2023-05-15T09:45:00"),
      isRead: true,
    },
    {
      id: 5,
      senderId: 3,
      text: "That solution was brilliant!",
      timestamp: new Date("2023-05-14T18:45:00"),
      isRead: false,
    },
    {
      id: 6,
      senderId: 1,
      text: "Hey Alice, have you seen the new feature?",
      timestamp: new Date("2023-05-15T10:00:00"),
      isRead: true,
    },
    {
      id: 7,
      senderId: 2, // alice_wonder
      text: "Not yet, what is it?",
      timestamp: new Date("2023-05-15T10:05:00"),
      isRead: true,
    },
    {
      id: 8,
      senderId: 1,
      text: "They added a new collaborative coding mode",
      timestamp: new Date("2023-05-15T10:10:00"),
      isRead: true,
    },
    {
      id: 9,
      senderId: 1,
      text: "I'll check it out later",
      timestamp: new Date("2023-05-15T10:15:00"),
      isRead: true,
    },
  ]

  filteredContacts: Friend[] = []

  ngOnInit(): void {
    this.filteredContacts = [...this.contacts]
    // Sort contacts by last message timestamp
    this.sortContacts()
  }

  filterContacts(): void {
    if (!this.searchQuery) {
      this.filteredContacts = [...this.contacts]
      this.sortContacts()
      return
    }

    const query = this.searchQuery.toLowerCase()
    this.filteredContacts = this.contacts.filter((contact) => contact.username.toLowerCase().includes(query))
  }

  sortContacts(): void {
    this.filteredContacts.sort((a, b) => {
      if (!a.lastMessage && !b.lastMessage) return 0
      if (!a.lastMessage) return 1
      if (!b.lastMessage) return -1

      return b.lastMessage.timestamp.getTime() - a.lastMessage.timestamp.getTime()
    })
  }

  selectContact(contact: Friend): void {
    this.selectedContact = contact

    // Mark messages as read
    if (contact.lastMessage && !contact.lastMessage.isRead && !contact.lastMessage.isFromMe) {
      contact.lastMessage.isRead = true
    }

    this.messages.forEach((message) => {
      if (message.senderId === contact.id && !message.isRead) {
        message.isRead = true
      }
    })
  }

  getMessagesForContact(contactId: number): Message[] {
    return this.messages
      .filter(
        (message) =>
          (message.senderId === contactId || message.senderId === 1) &&
          this.selectedContact &&
          (message.senderId === this.selectedContact.id || message.senderId === 1),
      )
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
  }

  sendMessage(): void {
    if (!this.newMessage.trim() || !this.selectedContact) return

    // Create new message
    const newMsg: Message = {
      id: this.messages.length + 1,
      senderId: 1, // Current user
      text: this.newMessage,
      timestamp: new Date(),
      isRead: false,
    }

    // Add to messages
    this.messages.push(newMsg)

    // Update last message in contact
    if (this.selectedContact) {
      this.selectedContact.lastMessage = {
        text: this.newMessage,
        timestamp: new Date(),
        isRead: false,
        isFromMe: true,
      }
    }

    // Clear input
    this.newMessage = ""

    // Resort contacts
    this.sortContacts()
  }
}

