function parseSearchParams(){
    var example = window.location.search;
    if (!example) return null;
    var searchWords = example.slice(1).split('&');
    // var get = [];
    var get = {};
    for (var i in searchWords) {
        var j = searchWords[i].split("=");
        // get.push(decodeURIComponent(j[0]), decodeURIComponent(j[1]));
        get[decodeURIComponent(j[0])] = decodeURIComponent(j[1]);
    }
    return get;
}