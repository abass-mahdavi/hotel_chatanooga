import os, requests, jsonpickle, json

def main():

    # Make a get request to get the latest position of the international space station from the opennotify api.
    response = requests.get("https://api.whatdoestrumpthink.com/api/v1/quotes/random")

    # Print the the response.
    print(response.json()['message'])


if __name__ == "__main__":
    main()