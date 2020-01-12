export default result => {
  const {studyInterval, totalPause, totalRest, totalWrongPos} = result;

  //if pause exceeds 10%, it will count
  const pauseCount = totalPause - 0.1 * studyInterval;
  const pauseScale = pauseCount / studyInterval;

  //not acceptable
  const wrongPosScale = totalWrongPos / studyInterval;

  //if rest exceeds 15%, it will count
  const restCount = totalRest - 0.15 * studyInterval;
  const restScale = restCount < 0 ? 0 : restCount / studyInterval;

  return (1 - (wrongPosScale + pauseScale + restScale)) * 100;
};
