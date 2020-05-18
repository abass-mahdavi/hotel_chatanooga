from random import randrange

lines = []


"""
with open("fortune_cookies.txt") as file_in:
    for line in file_in:
        if(line != '\n'):
            line = line.replace('\"', '').replace('    ', '').replace('.,', '.').replace('\n', ' ').replace('\r', '')
            lines.append(line)
l = len(lines)
print(lines[randrange(l)])        
print(lines)
      



"""

with open("Nietzche_quotes.txt") as file_in:
    for line in file_in:
        if(line != '\n'):
            line = line.replace('\n', ' ').replace('\r', '')
            lines.append(line)
l = len(lines)
print(lines[randrange(l)])     

print(lines)
      


