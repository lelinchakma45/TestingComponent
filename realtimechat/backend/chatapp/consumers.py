import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Message
from .serializers import MessageSerializer

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = 'chat_room'

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message_content = text_data_json['message']
        user = self.scope["user"]
        
        # Print the received message content
        print(f"Received message: {message_content} from user: {user.username}")

        # Save message to the database
        message = Message.objects.create(user=user, content=message_content)
        serializer = MessageSerializer(message)

        # Print the serialized message
        print(f"Serialized message: {serializer.data}")

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': serializer.data
            }
        )

    async def chat_message(self, event):
        message = event['message']
        
        # Print the message being sent to the WebSocket
        print(f"Sending message to WebSocket: {message}")
        
        # Send message to WebSocket
        await self.send(text_data=json.dumps(message))
