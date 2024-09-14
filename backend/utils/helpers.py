

class BiDirectionalDict:
    def __init__(self):
        self.sid_to_username = {}
        self.username_to_sid = {}
    
    def add(self,sid,username):
        if username in self.username_to_sid:
            self.username_to_sid[username].add(sid)
        else:
            self.username_to_sid[username] = {sid}
        self.sid_to_username[sid] = username
        
    
    def get_username(self,sid):
        return self.sid_to_username.get(sid)
    
    def get_value(self, username):
        return self.username_to_sid.get(username)
    
    # def get_sid(self, username):
    #     return self.username_to_sid.get(username)
    
    def __str__(self):
        return (f'{self.username_to_sid},{self.sid_to_username}')
    
    def delete(self,username,value):
        del self.sid_to_username[value]
        del self.username_to_sid[username]
    
    def reset(self):
        self.value_to_username = {}
        self.username_to_sid = {}


    
        
    
