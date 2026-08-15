(function () {
  var STORAGE_KEY = "hangoutResponses";

  function loadResponses() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  function saveResponses(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function updateResponses(patch) {
    var data = loadResponses();
    Object.keys(patch).forEach(function (key) {
      data[key] = patch[key];
    });
    saveResponses(data);
    return data;
  }

  function getCheckedValues(name) {
    var boxes = document.querySelectorAll('input[name="' + name + '"]:checked');
    return Array.prototype.map.call(boxes, function (box) {
      return box.value;
    });
  }

  function clearResponses() {
    localStorage.removeItem(STORAGE_KEY);
  }

  function submitResponses(endpoint) {
    var data = loadResponses();
    var payload = {};
    Object.keys(data).forEach(function (key) {
      var value = data[key];
      payload[key] = Array.isArray(value) ? value.join(", ") : value;
    });

    return fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    }).then(function (response) {
      if (response.ok) {
        clearResponses();
      }
      return response;
    });
  }

  window.HangoutResponses = {
    loadResponses: loadResponses,
    saveResponses: saveResponses,
    updateResponses: updateResponses,
    getCheckedValues: getCheckedValues,
    clearResponses: clearResponses,
    submitResponses: submitResponses,
  };
})();
