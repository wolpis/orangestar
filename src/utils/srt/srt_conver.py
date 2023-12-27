text = input()


t, y = text.split(",")
l = t.split(":")

m = int(l[1]) * 60
s = int(l[2])
ss = int(y)

print((m+s) * 1000 + ss)
