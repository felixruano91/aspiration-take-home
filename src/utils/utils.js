export const writeQueryToCache = ({
  queryCaller,
  client,
  query,
  variables,
  topicName,
  setCachedData,
}) => {
  // first, we look for the query in the cache
  const topic = client.readQuery({
    query,
    variables,
  })
  // then, we verify  that the cached topic is the same as the current topic with its name
  if (topic && topic.name === topicName) {
    // if it is we set the cached data state from out Topic component to avoid unnecessary requests
    setCachedData(topic);
    return;
  }
  // if there are no matches in the cache we execute the request, and then we add it to the cache
  queryCaller().then(({ data, variables }) => client.writeQuery({
    data,
    variables,
    query,
  })).catch(e => console.error(e));
};