myApp.factory('DataFactory', ['$http', function($http) {
    var apiData = undefined;

    // Private

    var privateCalculateMortgage = function(price, years, ir) {
        var months = parseInt(years) * 12;
        ir = ir / 1200;

        var numerator = ir * price * Math.pow(1 + ir, months);
        var denominator = Math.pow(1 + ir, months) - 1;
        var output =  numerator / denominator;
        return output.toFixed(2);
    };



    var initialSearch = function(address, cityStateZip) {
        console.log('API search from factory happening NOW!', address, cityStateZip);
        //var searchCriteria = {
        //    findAddress: address,
        //    findState: cityStateZip
        //};
        //
        //var ZWSID = "X1-ZWz19ssev2coi3_1u0pu";
        //
        //// test hardcoded request url:
        //var url = "http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=" + ZWSID + "&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA";
        //

        //var url = "http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=" + ZWSID + "&address="
        //    + address + "&citystatezip=" + cityStateZip;

        //var promise = $http.get('/zillow/' + searchCriteria).then(function(response) {
        //    console.log('data factory says yeehaw', searchCriteria);
        //    apiData = response.data;
        //    console.log('Async data response: ', apiData);
        //});
        //
        //return promise;
        var promise = $http.get('/GetZestimate').then(function(results) {
            console.log('data factory says yeehaw', searchCriteria);
            apiData = results;
            console.log('Async data response: ', apiData);
        });

        return promise;

    };









    // Public

    var publicAPI = {
        factoryCalculateMortgage: function(price, years, interestRate) {
            return privateCalculateMortgage(price, years, interestRate)
        },
        factoryAPICall: function (address, cityStateZip) {
            return initialSearch(address, cityStateZip);
        },
        factoryExportApiSearchResults: function() {
            return apiData;
        }

    };

    return publicAPI;

}]);
//
//<?xml version="1.0" encoding="utf-8"?><SearchResults:searchresults xsi:schemaLocation=
//    "http://www.zillow.com/static/xsd/SearchResults.xsd http://www.zillowstatic.com/vstatic/937aba7/static/xsd/SearchResults.xsd"
//xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
//xmlns:SearchResults="http://www.zillow.com/static/xsd/SearchResults.xsd"><request><address>2114 Bigelow Ave</address><citystatezip>Seattle, WA</citystatezip></request>
//<message><text>Request successfully processed</text><code>0</code></message><response><results><result><zpid>48749425</zpid>
//<links><homedetails>http://www.zillow.com/homedetails/2114-Bigelow-Ave-N-Seattle-WA-98109/48749425_zpid/</homedetails><graphsanddata>http://www.zillow.com/homedetails/2114-Bigelow-Ave-N-Seattle-WA-98109/48749425_zpid/#charts-and-data</graphsanddata><mapthishome>http://www.zillow.com/homes/48749425_zpid/</mapthishome><comparables>http://www.zillow.com/homes/comps/48749425_zpid/</comparables></links><address><street>2114 Bigelow Ave N</street><zipcode>98109</zipcode><city>Seattle</city><state>WA</state><latitude>47.637933</latitude><longitude>-122.347938</longitude></address><zestimate><amount currency="USD">1387106</amount><last-updated>03/27/2016</last-updated><oneWeekChange deprecated="true"></oneWeekChange><valueChange duration="30" currency="USD">-8893</valueChange><valuationRange><low currency="USD">1303880</low><high currency="USD">1484203</high></valuationRange><percentile>0</percentile></zestimate><localRealEstate><region name="East Queen Anne" id="271856" type="neighborhood"><zindexValue>742,400</zindexValue><links><overview>http://www.zillow.com/local-info/WA-Seattle/East-Queen-Anne/r_271856/</overview><forSaleByOwner>http://www.zillow.com/east-queen-anne-seattle-wa/fsbo/</forSaleByOwner><forSale>http://www.zillow.com/east-queen-anne-seattle-wa/</forSale></links></region></localRealEstate></result></results></response></SearchResults:searchresults><!-- H:003  T:114ms  S:869  R:Mon Mar 28 11:30:09 PDT 2016  B:4.0.27097-master.563cd32~hotfix.e09ffb7 -->