import React, {useEffect} from 'react';
import Typeable from './typeable'
import './vertical_alignments.css'
import useLyrics from './hooks/use_typeables';
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks';

function SyncedLyricMapper({input, captions}){
  return(
    <div>
      <div>
        {captions
          ? captions.map(t => <Typeable key = {t.id} {...t} gotWrong = {gotWrong}/>)
          : null
        }
      </div>  
    </div>
  )
};

export default TypeableMapper;
