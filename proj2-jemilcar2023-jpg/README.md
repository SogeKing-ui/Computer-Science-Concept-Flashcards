# Web Development Project 2 - Flashcards

Submitted by: **Jehu Emilcar**

Z#: 23568962

This web app: CS Concepts Flashcards is an interactive React app that helps users review core computer science concepts through clickable flashcards. Users can flip each card to reveal answers, view a randomized new card, and explore visual categories with images for a more engaging learning experience.

Time spent: 5 hours spent in total

## Required Features

The following **required** functionality is completed:


- [x] **The app displays the title of the card set, a short description, and the total number of cards**
  - [x] Title of card set is displayed 
  - [x] A short description of the card set is displayed 
  - [x] A list of card pairs is created
  - [x] The total number of cards in the set is displayed 
  - [x] Card set is represented as a list of card pairs (an array of dictionaries where each dictionary contains the question and answer is perfectly fine)
- [x] **A single card at a time is displayed**
  - [x] Only one half of the information pair is displayed at a time
- [x] **Clicking on the card flips the card over, showing the corresponding component of the information pair**
  - [x] Clicking on a card flips it over, showing the back with corresponding information 
  - [x] Clicking on a flipped card again flips it back, showing the front
- [x] **Clicking on the next button displays a random new card**

The following **optional** features are implemented:

- [x] Cards contain images in addition to or in place of text
  - [x] Some or all cards have images in place of or in addition to text
- [x] Cards have different visual styles such as color based on their category
  - Example categories you can use:
    - Difficulty: Easy/medium/hard
    - Subject: Biology/Chemistry/Physics/Earth science

The following **additional** features are implemented:

* [x] Cards have different visual styles by category

## Video Walkthrough

Here's a walkthrough of implemented required features:

https://www.loom.com/share/99147c39664c4aa197847e934efe7fd5

## GIF

![Kapture 2026-02-08 at 16 36 53](https://github.com/user-attachments/assets/a078557c-29b8-4b40-9969-9913385041ab)


## Notes

A main challenge was managing state when flipping cards and switching to a new random card while keeping the UI consistent. Implementing the CSS flip animation required troubleshooting conflicting styles, and organizing the app into reusable components helped improve structure. Adding images and category styling also involved resolving file path and class name issues.

## License

    Copyright 2026 Jehu Emilcar

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
