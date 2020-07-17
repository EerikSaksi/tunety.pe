import React from 'react'
import '@testing-library/jest-dom'
import {render, fireEvent, screen} from '@testing-library/react'
import LyricsTimeLine from 'components/lyrics/preview/lyrics_timelines'
import sampleSync from 'components/lyrics/syncing/sample_sync'

test('You\'re appears at 50 something', () => {
  render(<LyricsTimeLine videoDuration={55} syncedLyrics={sampleSync} changeLyricById={() => {}} aboveProgressBar={true} />)
  expect(screen.queryByText('You\'re')).toBeInTheDocument()
})

