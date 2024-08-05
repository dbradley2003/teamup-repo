

class BiDirectionalDict:
    def __init__(self):
        self.key_to_value = {}
        self.value_to_key = {}
        self.sid_to_username = {}
    
    def add(self,key,value,username):
        self.key_to_value[key] = value
        self.value_to_key[value] = key
        self.sid_to_username[value] = username
    
    def get_key(self,value):
        return self.value_to_key.get(value)
    
    def get_value(self, key):
        return self.key_to_value.get(key)
    
    def get_username(self, value):
        return self.sid_to_username.get(value)
    
    def __str__(self):
        return (f'{self.key_to_value},{self.value_to_key},{self.sid_to_username}')
    
    def delete(self,key,value):
        del self.key_to_value[key]
        del self.value_to_key[value]
        del self.sid_to_username[value]
    
    def reset(self):
        self.key_to_value = {}
        self.value_to_key = {}
        self.sid_to_username = {}


    
        
    
