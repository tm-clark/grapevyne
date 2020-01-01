import * as types from '../constants/actionTypes';

const initialState = {
  zipCode: '',
  currentTips: [
    {
      id: 1,
      header: 'Test Tip',
      blurb: 'This is a test tip',
      timestamp: 'Dec 2019',
      zip: '90039',
      votes: 10,
      tags:['Food', 'Nature']
    },
    {
      id: 2,
      header: 'BAD BOY',
      blurb: 'There\'s a BAD BOY in VENICE!!! WATCH OUT!',
      timestamp: 'Dec 2019',
      zip: '90039',
      votes: 2,
      tags:['Sketchy', 'Free']
    },
  ],
  tag: '',
  tempTips: [],
};

const tipsReducer = (state=initialState, action) => {

  let zipCode;
  let currentTips;

  switch(action.type) {
//////////
    case types.GET_ZIP_CODE:
      if(action.payload) {
        zipCode = action.payload;
        
        return {
          ...state,
          zipCode,
        };
      }
      else return state;
//////////
    case types.GET_LOCAL_TIPS:
      if(state.zipCode) {
        
        // Fetch tips from DB with provided zipcode
        // fill currentTips with resulting data

        fetch(`/tips/findTips/${state.zipCode}`)
          .then(response => response.json())
          .then(data => {
            console.log('Response from fetch request to findTips');
            console.log(data.tips);
            currentTips = data.tips;

            return {
              ...state,
              currentTips,
            };
          })
          .catch(err => {
            console.log('Error in fetch to findTips', err);

            return;
          });
      }
      else return state;

//////////
case types.UPVOTE:

    currentTips = [...state.currentTips]
    for(let i = 0; i < currentTips.length; i++) {
      if(currentTips[i].id === action.payload) {
        currentTips[i].votes++;
        console.log('UPVOTED', currentTips[i].header);
        //ADD DATABASE UPVOTE PUT-LOGIC HERE
        //POTENTIALLY UPDATE STATE TO AVOID A SECOND /GET REQUEST??
      }
    }
    return {
      ...state,
      currentTips,
    };

//////////
case types.DOWNVOTE:

  currentTips = [...state.currentTips]
  for(let i = 0; i < currentTips.length; i++) {
    if(currentTips[i].id === action.payload) {
      currentTips[i].votes--;
      console.log('DOWNVOTED', currentTips[i].header);
      //ADD DATABASE UPVOTE PUT-LOGIC HERE
      //POTENTIALLY UPDATE STATE TO AVOID A SECOND /GET REQUEST??
    }
  }
  return {
    ...state,
    currentTips,
  };

////////// FOR DEVELOPMENT ONLY
// case types.GET_DUMMY_TIPS:
//   if(!state.zipCode) {
//     currentTips = [
//       {
//         id: 1,
//         header: 'Test Tip',
//         blurb: 'This is a test tip',
//         timestamp: 'Dec 2019',
//         zip: '90039',
//         votes: 10,
//         tags:['Food', 'Nature']
//       },
//       {
//         id: 2,
//         header: 'BAD BOY',
//         blurb: 'There\'s a BAD BOY in VENICE!!! WATCH OUT!',
//         timestamp: 'Dec 2019',
//         zip: '90039',
//         votes: 2,
//         tags:['Sketchy', 'Free']
//       },
//     ]
//     return {
//       ...state,
//       currentTips,
//     };
//   }
//   else return state;
//////////
  default:
        return state;
  }
};

export default tipsReducer;