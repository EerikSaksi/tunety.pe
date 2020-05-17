const GET_INPUT = gql`
  {
    input @client
  }
`;
const [validUrl, setValidUrl] = useState(undefined);
const { data: inputData, client } = useQuery(GET_INPUT, {
  skip: validUrl,
});

