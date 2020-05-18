import os, requests, jsonpickle, json

def main():

    # Make a get request to get the latest position of the international space station from the opennotify api.
    response = requests.get("http://api.icndb.com/jokes/random/")

    # Print the the response.
    print(response.json()['value']['joke'])


if __name__ == "__main__":
    main()