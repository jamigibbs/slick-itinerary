const axios = require('axios').default;
const path = require("path");
const express = require("express");
const app = express();
const morgan = require("morgan");

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const TRELLO_API_ROOT = 'https://api.trello.com/1';
const TRELLO_KEY = process.env.REACT_APP_TRELLO_KEY;
const TRELLO_TOKEN = process.env.REACT_APP_TRELLO_TOKEN;

app.use(morgan('tiny'));

if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`)
    } else {
      next()
    }
  })
}

app.get('/api/board/:boardShortLink', async function (req, res) {
  const boardShortLink = req.params.boardShortLink;
  try {
    const itinerary = await getTrelloBoards(boardShortLink);
    let customFields = [];

    if (itinerary.id) {
      const boardListsData = await getTrelloBoardLists(boardShortLink);

      itinerary.lists = boardListsData;
      itinerary.lists.forEach((item) => {
        // Adding a place to push cards assigned to the list for the next fetch.
        item.cards = [];
      });
      const boardCustomFields = await getBoardCustomFields(boardShortLink);
      customFields = boardCustomFields;

      const boardCards = await getBoardCards(boardShortLink);
      // Getting the cards that have a cover ID for us to fetch the image.
      const cardsWithCovers = boardCards.cards.filter((item, i) => {
        return item.cover.idAttachment;
      });

      // Creating our batched request array for fetching cover urls. 
      const requests = await createCardCoverBatch(cardsWithCovers);

      await Promise.all(requests)
        .then(responses => Promise.all(responses.map(({data}) => data)))
        .then(batchedData => {

          // Combine the batched array responses into a single array.
          const mergedCardsWithCovers = [].concat.apply([], batchedData);

          boardCards.cards.forEach((card) => {
            // Finding which list the card goes and putting it into that list.
            const list = itinerary.lists.find((item) => {
              return item.id === card.idList
            });

            // Finding the card cover image url and adding it to the card.
            const cover = mergedCardsWithCovers.find((cardWithCover) => {
              return card.cover.idAttachment === cardWithCover[200].id;
            });

            if (cover) card.cover.url = cover[200].url;
      
            // Mapping the custom field name to the custom field value.
            card.customFieldItems.map((fieldItem) => {
              const matchingCustomField = customFields.find((field) => {
                return field.id === fieldItem.idCustomField
              });
              if (matchingCustomField) fieldItem.name = matchingCustomField.name;
              return fieldItem;
            });
      
            list.cards.push(card);
          });
        });

      return res.status(200).json(itinerary);
    }
  } catch(error) {
    return res.status(400).send(error);
  }
});

async function createCardCoverBatch(cardsWithCovers){
  const batchedUrls = [];
  let batch = [];

  for (let i = 0; i < cardsWithCovers.length; i++) {
    // if it's the 10th item, add array to batchedUrls and reset the batch array.
    const url = `/cards/${cardsWithCovers[i].id}/attachments/${cardsWithCovers[i].cover.idAttachment}`;
    batch.push(url);
    // If we have our max 10 request urls, or it's the last item, push the request url group and reset batch array.
    if (batch.length === 10 || i === cardsWithCovers.length - 1) {
      batchedUrls.push(batch);
      batch = [];
    }
  }

  let requests = batchedUrls.map(async (urls) => {
    return await axios.get(`${TRELLO_API_ROOT}/batch?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}&urls=${urls}`)
  });

  return requests;
}

async function getTrelloBoards(boardShortLink){
  try {
    const { data } = await axios.get(`${TRELLO_API_ROOT}/boards/${boardShortLink}?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}&fields=name,url,prefs,cards,shortLink`);
    return data;
  } catch(error) {
    console.error('getTrelloBoards error', error);
    return;
  }
}

async function getTrelloBoardLists(boardShortLink){
  try {
    const { data } = await axios.get(`${TRELLO_API_ROOT}/boards/${boardShortLink}/lists?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`);
    return data;
  } catch(error) {
    console.error('getTrelloBoardLists error', error);
    return;
  }
}

async function getBoardCustomFields(boardShortLink){
  try {
    const { data } = await axios.get(`${TRELLO_API_ROOT}/boards/${boardShortLink}/customFields?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`);
    return data;
  } catch(error) {
    console.error('getBoardCustomFields error', error);
    return;
  }
}

async function getTrelloBatch(urls){
  try {
    const { data } = await axios.get(`${TRELLO_API_ROOT}/batch?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}&urls=${urls}`);
    return data;
  } catch(error) {
    console.error('getTrelloBatch error', error);
    return;
  }
}

async function getBoardCards(boardShortLink){
  try {
    const { data } = await axios.get(`${TRELLO_API_ROOT}/boards/${boardShortLink}?cards=visible&card_customFieldItems=true&key=${TRELLO_KEY}&token=${TRELLO_TOKEN}&attachments=true&attachment_fields=all`);
    return data;
  } catch(error) {
    return;
  }
}

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server is on up ${port} now !`);
});