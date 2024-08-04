

class BiDirectionalDict:
    def __init__(self):
        self.key_to_value = {}
        self.value_to_key = {}
    
    def add(self,key,value):
        self.key_to_value[key] = value
        self.value_to_key[value] = key
    
    def get_key(self,value):
        return self.value_to_key.get(value)
    
    def get_value(self, key):
        return self.key_to_value.get(key)
    
    def __str__(self):
        return (f'{self.key_to_value},{self.value_to_key}')
    
    def delete(self,key,value):
        del self.key_to_value[key]
        del self.value_to_key[value]
    
    def reset(self):
        self.key_to_value = {}
        self.value_to_key = {}


    
        
    
