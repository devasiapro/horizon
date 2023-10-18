from .Dragon import Dragon
from .Dragon88 import Dragon88

class InstanceFactory:

    def buildInstance(self, instance_type):
        if instance_type == 'dragon88':
            return Dragon88()
        if instance_type == 'dragon':
            return Dragon() 

        return Dragon88() 
