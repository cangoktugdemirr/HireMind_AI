from PIL import Image

def remove_black():
    try:
        img = Image.open('public/logo.png').convert('RGBA')
        data = img.getdata()
        new_data = []
        for item in data:
            if item[0] < 30 and item[1] < 30 and item[2] < 30:
                new_data.append((255, 255, 255, 0)) # fully transparent
            else:
                new_data.append(item)
        img.putdata(new_data)
        img.save('public/logo.png')
        print("Logo background removed")
    except Exception as e:
        print("Error:", e)

remove_black()
