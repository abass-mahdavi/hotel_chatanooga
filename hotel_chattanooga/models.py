class Participant:
    def __init__(self,name):
        self.name = name
        
        #participant has not yet joined any room
        self.current_room = ""

    def set_current_room(self, room):
        if (room):
            self.current_room = room.name
        else:
            self.current_room = ""

class Room:
    def __init__(self,name):
        self.name = name

        #there are no participants in th room at its creation
        self.participants = []

        #there are no posts in the room at its creation
        self.posts = []
 
    #removes participant from its previous room an puts it to this room
    def add_participant(self, participant):
        participant.set_current_room(self) 
        self.participants.append(participant.name)
    
    def remove_participant(self, participant):
            self.participants.remove(participant.name)
            participant.set_current_room("")

    def insertPost(self, post):
        self.posts.append(post)

        while (len(self.posts) > 100):
            self.posts.pop(0) #removes the first (oldest) post of posts)


class Post:
    def __init__(self, author_name, message, time_stamp):
        self.author_name = author_name
        self.message = message
        self.time_stamp = time_stamp


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

