import AsyncStorage from '@react-native-async-storage/async-storage';

export default class DataStore {

    /**
     * 获取数据，优先获取本地数据，如果本地无数据或者本地数据过期则获取网络数据
     * @param url  获取数据的url
     * @param flag
     */
    fetchData(url, flag = false) {
        return new Promise((resolve, reject) => {
            this._fetchLocalData(url).then((wrapData) => {
                if (wrapData && DataStore.checkTimestampValid(wrapData.timestamp)) {
                    resolve(wrapData);
                } else {
                    this._fetchNetData(url, flag).then(data => {
                        resolve(this._wrapData(data));
                    }).catch(error => {
                        reject(error);
                    });
                }
            }).catch(error => {
                this._fetchNetData(url, flag).then(data => {
                    resolve(this._wrapData(data));
                }).catch(error => {
                    reject(error);
                });
            });
        });
    }

    /**
     * 保存数据到本地
     * @param url
     * @param data
     * @param callback
     * @private
     */
    _saveData(url, data, callback) {
        if (!data || !url) {
            return;
        }

        AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)), callback);
    }

    /**
     * 获取本地数据
     * @param url
     * @private
     */
    _fetchLocalData(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(e);
                        console.error(e);
                    }
                } else {
                    reject(error);
                    console.error(error);
                }
            });
        });
    }

    /**
     * 获取网络数据
     * @param url
     * @param flag
     * @private
     */
    _fetchNetData(url, flag) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then((responseData) => {
                    this._saveData(url, responseData);
                    resolve(responseData);
                })
                .catch(e => {
                    reject(e);
                });
        });
    }

    _wrapData(data) {
        return {data, timestamp: new Date().getTime()};
    }

    /**
     * 检查时间戳是否在有效期内
     * @param timestamp  项目更新时间
     * @returns {boolean} true 不需要更新，false 需要更新
     */
    static checkTimestampValid(timestamp) {
        const currentDate = new Date();
        let targetDate = new Date();
        targetDate.setTime(timestamp);
        if (currentDate.getMonth() !== targetDate.getMonth()) {
            return false;
        }
        if (currentDate.getDate() !== targetDate.getDate()) {
            return false;
        }
        if (currentDate.getHours() - targetDate.getHours() > 4) {
            return false;
        }

        return true;
    }
}
