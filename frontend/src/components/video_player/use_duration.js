export default function useDuration() {
  const [duration, setDuration] = useState(0)
  const incrementDuration = (amount) => {
    setDuration(duration => duration + amount)
  }
  return [duration, setDuration, incrementDuration]
}
