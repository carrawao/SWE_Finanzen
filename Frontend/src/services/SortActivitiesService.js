class SortActivitiesService {
  //sort activitiesArray by date (latest date at start of array), by name (alphabetical) and by type (alphabetical)
  static sortActivities (activitiesArray) {
    activitiesArray.sort((element1, element2) => {
      const dateResult = (new Date(element2.date)) - (new Date(element1.date));
      if (dateResult === 0) {
        //if date is the same sort by assetName
        const nameResult = element1.assetName > element2.assetName ? 1 : element2.assetName > element1.assetName ? -1 : 0;
        if (nameResult === 0) {
          //if name is the same sort by activityType
          return element1.type > element2.type ? 1 : element2.type > element1.type ? -1 : 0;
        }
        return nameResult;
      }
      return dateResult;
    });
    return activitiesArray;
  }
}

export default SortActivitiesService;