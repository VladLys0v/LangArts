<<<<<<< HEAD
## Available Scripts
In the project directory, you can run:
### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
### `npm test`
Launches the test runner in the interactive watch mode.\
### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
=================================================================================================================================================================================
# LangArts
This is a language web application which purpose is to facilitate the process of memorizing words in different languages. 
Uses React, Node, MySQL. Connected to multiple free APIs to support automatic translations and data base population.

# Navbar 
Navbar includes logo, Memory cards button (1), Topics button (2) and Sign in button (not implemented)
(1) and (2) buttons once clicked scroll the page till the corresponding block is in view.
![image](https://github.com/VladLys0v/LangArts/assets/93451020/60d2a64c-51d8-412b-b5b7-267edf2d94b7)

# Header
Header and Navbar have the same background.
Header includes: 
 - More button (1), which changes the background on click; 
 - languages (2), between which user can choose (positioned at the bottom all the time);
 - a swap button (3).
![image](https://github.com/VladLys0v/LangArts/assets/93451020/cf963906-bfe6-4d02-9342-77fc6aebc375)
![image](https://github.com/VladLys0v/LangArts/assets/93451020/b4e0b6a7-d223-4d40-aa27-49f570f16bd1)

# Topics
Topics include mirrored background of the Header. Once More button in Header is clicked, the background of Topics changes as well.
Topics include:
- horizontal scroll with multiple items (1);
- Left arrow (2) and Right arror (3) buttons that allow to scroll the container with the items
- plus button (4), which on click opens a pop-up window, through which a new item can be added to a scrollable container
- pop-up window (5), that offers to add the name of an item, that can be added to the scrollable container
- delete icon (6), that is located on right-top corner of each item added through plus button
![image](https://github.com/VladLys0v/LangArts/assets/93451020/88e29b60-9947-4d29-a149-2b606a861df5)

# Memory cards and Footer
Memory cards inlude:
- settings icon (1), which on click opens a window with settings (content is not added)
- Memory cards button (2), which on click opens a window with Memory cards functionality
- Vocabulary button (3), which on click opens a window with Vocabulary functionality
*Footer includes only a picture 
![image](https://github.com/VladLys0v/LangArts/assets/93451020/7b8fce03-89a5-4358-9261-b56761298718)

# Memory cards window
It opens once user clicks on Memory cards button and the user first is introduced to a countdown from 3 to 1. After the countdown the content appears.
The language of the top word is set in the language swap section in the bottom on the landing page. Thus the user should use the second language (right language) in order to give the correct answer in input field.
Memory cards window includes:
- close icon (1), which closes the window on click
- like icon (2), which is filled in with red color when clicked. The pair of word and translation in that case is added to Favorite tab in Vocabulary window.
- question icon (3) - not implemented
- settings icon (4) - not implemented
- Left arrow button (5) and Right arror button (6) allow to move between words
- the word (7) - the word's language is set on the landing page in the bottom language section (left option)
- Mic icon (8) - activates speech recognition, that, once clicked, writes down whatever user says in the input field 
- input field (9) - excepts both manual input and through speech recognition
- Approve icon (10) - it needs to be clicked once input is done in order to validate the translation of the word (7)
- words count (11) - allows to monitor the progress
![image](https://github.com/VladLys0v/LangArts/assets/93451020/c5b76e62-15a9-4912-a390-b1da26f20335)

# Vocabulary window
Vocabulary containes all the words the data base is populated with.
Vocabulary includes:
- plus icon (1) unfolds input field with 2 icons
- input field (1.1) - here user can input the word, that he wants to add to the list 
- submit icon (1.2) if the word has been added to input field, the click on this icon will add the word to the list + it adds translation if a word in right column is missing 
(the word will be added to the left column, the corresponding right column value will be empty (uless submit icon (1.2) will be clicked again, as in this case the translation will be added automatically)
- close icon (1.3) - hides these 3 subitems and returns plus icon into view
![image](https://github.com/VladLys0v/LangArts/assets/93451020/f4e281e0-07ca-4f9a-97cb-09a75d11dee1)
- search (2) checks for matches in frontend and filters the list displaying only those items that match the query
- All tab (3) displays the list with all words
- Favorite tab (4) - once it is clicked, The tab will be switched to Favorite, where only items, that have been "liked" in Memory cards window, will be displayed
- left column of words(5) shows all words that are included to left language option / corresponding table in the database
- right column of words(5) shows all words that are included to right language option / corresponding table in the database
- delete icon (7) allows to delete the pair of words from database
- close icon (8) closes the window
- filter icon (9) - not implemented
- settings icon (10) - unfolds a frame with 4 buttons in it
- Add to topic button (10.1) - not implemented
- Add random words (10.2) - adds random words to the left column (amount depends on the corresponding parameter in code)
- Add to favorite (10.3) - not implemented
- Change reoccurance (10.4) - not implemented
![image](https://github.com/VladLys0v/LangArts/assets/93451020/329972f7-f3f2-4f1b-b53a-5762f00661e9)
- language swap feature (11) - same as on the landing page, once swapped columns swap as well
![image](https://github.com/VladLys0v/LangArts/assets/93451020/d4b993f1-875f-46fa-a512-773b03b174a5)


>>>>>>> 09829f9b9d0d1dd6d62ccea256266c126a3787ab
