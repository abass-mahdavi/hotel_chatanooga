class Participant:
    def __init__(self,name):
        self.name = name

        #at creation participant is not yet online
        self.status = "online"
        
        #participant has not yet joined any room
        self.current_room = None

    def set_current_room(self, room):
        if (self.current_room is not None):
            self.current_room.remove_participant(self)
        self.current_room = room


class Room:
    def __init__(self,name):
        self.name = name

        #there are no participants in th room at its creation
        self.participants = []

        #there are no posts in the room at its creation
        self.posts = []

    def insertPost(self, post):
        self.posts.append(post)
        while (len(self.posts) > 100):
            self.posts.pop(0) #removes the first (oldest) post of posts)

    def add_participant(self, participant):
        if (participant.status=="online"):
            participant.set_current_room(self) 

    def remove_participant(self,participant):
        self.participants.remove(participant)
        participant.set_current_room(None)



#a warpper class to handle collections of object with a "name" attribute in FLAK
#suchs as list of rooms or list of participants
class Flak_wrapper:
    def __init__(self):
        self.members = []
    
    def check_name(self, name):
        return any (member.name == name for member in self.members)

    def insert(self, member):
        if (not self.check_name(member.name)):
            self.members.append(member)

    def remove(self,member):
        if (self.check_name(member.name)):
            self.members.remove(member)

    #returns the first member with a name argument matching name or None
    def get(self,name):
        return next((member for member in self.members if member.name == name), None)


class Post:
    def __init__(self, author, message, time_stamp):
        self.author = author
        self.message = message
        self.time_stamp = time_stamp
