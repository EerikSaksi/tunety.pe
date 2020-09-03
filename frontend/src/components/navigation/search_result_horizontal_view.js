import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SearchResult from 'components/navigation/search_result';

export default function SearchResultHorizontalView({ searchResults, dateClassified, displayDate }) {
  //we want to filter only the searchResults that match the dateClassified enum
  //enum DateClassified{
  //  TODAY
  //  YESTERDAY
  //  THIS_WEEK
  //  FURTHER_BACK
  //}

  const mappedResults = searchResults
    .filter((searchResult) => searchResult.dateClassifier.dateClassified === dateClassified)
    .map((searchResult, index) => <SearchResult {...searchResult} style={{ height: 300, maxWidth: 300 }} fadeInMillis = {(index + 1) * 200} />);

  //if no results don't even render for example 'This Week' with no elements
  if (!mappedResults.length) {
    return null;
  }
  return (
    <>
      <Row style={{ marginTop: '1.5em' }}>
        <p>{displayDate}</p>
      </Row>
      <div style={{ display: 'flex', alignItems: 'center', overflowX: 'scroll' }}>{mappedResults}</div>
    </>
  );
}
