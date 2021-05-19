/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 4.0, "minX": 0.0, "maxY": 937.0, "series": [{"data": [[0.0, 4.0], [0.1, 4.0], [0.2, 4.0], [0.3, 5.0], [0.4, 5.0], [0.5, 5.0], [0.6, 5.0], [0.7, 5.0], [0.8, 5.0], [0.9, 5.0], [1.0, 5.0], [1.1, 6.0], [1.2, 6.0], [1.3, 6.0], [1.4, 6.0], [1.5, 7.0], [1.6, 7.0], [1.7, 7.0], [1.8, 9.0], [1.9, 28.0], [2.0, 37.0], [2.1, 39.0], [2.2, 42.0], [2.3, 44.0], [2.4, 46.0], [2.5, 51.0], [2.6, 53.0], [2.7, 56.0], [2.8, 61.0], [2.9, 64.0], [3.0, 66.0], [3.1, 68.0], [3.2, 70.0], [3.3, 71.0], [3.4, 72.0], [3.5, 73.0], [3.6, 76.0], [3.7, 78.0], [3.8, 79.0], [3.9, 80.0], [4.0, 81.0], [4.1, 83.0], [4.2, 84.0], [4.3, 85.0], [4.4, 85.0], [4.5, 87.0], [4.6, 90.0], [4.7, 91.0], [4.8, 93.0], [4.9, 95.0], [5.0, 97.0], [5.1, 100.0], [5.2, 102.0], [5.3, 105.0], [5.4, 107.0], [5.5, 110.0], [5.6, 112.0], [5.7, 114.0], [5.8, 116.0], [5.9, 117.0], [6.0, 118.0], [6.1, 119.0], [6.2, 120.0], [6.3, 120.0], [6.4, 121.0], [6.5, 123.0], [6.6, 124.0], [6.7, 125.0], [6.8, 127.0], [6.9, 127.0], [7.0, 129.0], [7.1, 129.0], [7.2, 131.0], [7.3, 132.0], [7.4, 133.0], [7.5, 135.0], [7.6, 136.0], [7.7, 137.0], [7.8, 138.0], [7.9, 140.0], [8.0, 142.0], [8.1, 145.0], [8.2, 147.0], [8.3, 148.0], [8.4, 148.0], [8.5, 149.0], [8.6, 150.0], [8.7, 150.0], [8.8, 151.0], [8.9, 153.0], [9.0, 153.0], [9.1, 154.0], [9.2, 156.0], [9.3, 157.0], [9.4, 157.0], [9.5, 158.0], [9.6, 160.0], [9.7, 161.0], [9.8, 163.0], [9.9, 164.0], [10.0, 165.0], [10.1, 166.0], [10.2, 167.0], [10.3, 168.0], [10.4, 169.0], [10.5, 170.0], [10.6, 172.0], [10.7, 174.0], [10.8, 175.0], [10.9, 177.0], [11.0, 179.0], [11.1, 180.0], [11.2, 180.0], [11.3, 181.0], [11.4, 182.0], [11.5, 182.0], [11.6, 183.0], [11.7, 183.0], [11.8, 184.0], [11.9, 185.0], [12.0, 186.0], [12.1, 187.0], [12.2, 188.0], [12.3, 189.0], [12.4, 189.0], [12.5, 190.0], [12.6, 191.0], [12.7, 192.0], [12.8, 193.0], [12.9, 194.0], [13.0, 194.0], [13.1, 195.0], [13.2, 196.0], [13.3, 197.0], [13.4, 197.0], [13.5, 197.0], [13.6, 198.0], [13.7, 199.0], [13.8, 199.0], [13.9, 200.0], [14.0, 201.0], [14.1, 201.0], [14.2, 202.0], [14.3, 202.0], [14.4, 202.0], [14.5, 203.0], [14.6, 203.0], [14.7, 204.0], [14.8, 206.0], [14.9, 207.0], [15.0, 207.0], [15.1, 208.0], [15.2, 209.0], [15.3, 211.0], [15.4, 212.0], [15.5, 212.0], [15.6, 213.0], [15.7, 213.0], [15.8, 214.0], [15.9, 215.0], [16.0, 215.0], [16.1, 216.0], [16.2, 216.0], [16.3, 216.0], [16.4, 217.0], [16.5, 217.0], [16.6, 218.0], [16.7, 218.0], [16.8, 218.0], [16.9, 219.0], [17.0, 220.0], [17.1, 220.0], [17.2, 221.0], [17.3, 222.0], [17.4, 222.0], [17.5, 223.0], [17.6, 224.0], [17.7, 225.0], [17.8, 225.0], [17.9, 226.0], [18.0, 226.0], [18.1, 227.0], [18.2, 227.0], [18.3, 228.0], [18.4, 228.0], [18.5, 229.0], [18.6, 229.0], [18.7, 229.0], [18.8, 230.0], [18.9, 230.0], [19.0, 231.0], [19.1, 231.0], [19.2, 231.0], [19.3, 231.0], [19.4, 231.0], [19.5, 232.0], [19.6, 232.0], [19.7, 232.0], [19.8, 233.0], [19.9, 233.0], [20.0, 233.0], [20.1, 233.0], [20.2, 234.0], [20.3, 234.0], [20.4, 234.0], [20.5, 234.0], [20.6, 234.0], [20.7, 235.0], [20.8, 235.0], [20.9, 235.0], [21.0, 235.0], [21.1, 236.0], [21.2, 236.0], [21.3, 236.0], [21.4, 236.0], [21.5, 237.0], [21.6, 237.0], [21.7, 237.0], [21.8, 237.0], [21.9, 238.0], [22.0, 238.0], [22.1, 238.0], [22.2, 239.0], [22.3, 239.0], [22.4, 239.0], [22.5, 240.0], [22.6, 240.0], [22.7, 240.0], [22.8, 241.0], [22.9, 241.0], [23.0, 242.0], [23.1, 242.0], [23.2, 242.0], [23.3, 243.0], [23.4, 244.0], [23.5, 245.0], [23.6, 245.0], [23.7, 246.0], [23.8, 246.0], [23.9, 246.0], [24.0, 246.0], [24.1, 247.0], [24.2, 247.0], [24.3, 247.0], [24.4, 247.0], [24.5, 248.0], [24.6, 248.0], [24.7, 248.0], [24.8, 248.0], [24.9, 249.0], [25.0, 249.0], [25.1, 249.0], [25.2, 249.0], [25.3, 250.0], [25.4, 250.0], [25.5, 250.0], [25.6, 250.0], [25.7, 250.0], [25.8, 251.0], [25.9, 251.0], [26.0, 251.0], [26.1, 251.0], [26.2, 252.0], [26.3, 252.0], [26.4, 252.0], [26.5, 253.0], [26.6, 253.0], [26.7, 253.0], [26.8, 253.0], [26.9, 254.0], [27.0, 254.0], [27.1, 254.0], [27.2, 255.0], [27.3, 255.0], [27.4, 255.0], [27.5, 255.0], [27.6, 256.0], [27.7, 256.0], [27.8, 257.0], [27.9, 257.0], [28.0, 258.0], [28.1, 258.0], [28.2, 258.0], [28.3, 258.0], [28.4, 258.0], [28.5, 259.0], [28.6, 259.0], [28.7, 259.0], [28.8, 260.0], [28.9, 260.0], [29.0, 260.0], [29.1, 260.0], [29.2, 261.0], [29.3, 261.0], [29.4, 261.0], [29.5, 262.0], [29.6, 262.0], [29.7, 262.0], [29.8, 263.0], [29.9, 263.0], [30.0, 263.0], [30.1, 263.0], [30.2, 264.0], [30.3, 264.0], [30.4, 264.0], [30.5, 265.0], [30.6, 265.0], [30.7, 265.0], [30.8, 265.0], [30.9, 265.0], [31.0, 265.0], [31.1, 265.0], [31.2, 266.0], [31.3, 266.0], [31.4, 266.0], [31.5, 266.0], [31.6, 266.0], [31.7, 266.0], [31.8, 267.0], [31.9, 267.0], [32.0, 267.0], [32.1, 267.0], [32.2, 268.0], [32.3, 268.0], [32.4, 268.0], [32.5, 268.0], [32.6, 269.0], [32.7, 269.0], [32.8, 269.0], [32.9, 269.0], [33.0, 270.0], [33.1, 270.0], [33.2, 270.0], [33.3, 270.0], [33.4, 270.0], [33.5, 270.0], [33.6, 271.0], [33.7, 271.0], [33.8, 271.0], [33.9, 271.0], [34.0, 271.0], [34.1, 271.0], [34.2, 272.0], [34.3, 272.0], [34.4, 272.0], [34.5, 272.0], [34.6, 272.0], [34.7, 273.0], [34.8, 273.0], [34.9, 273.0], [35.0, 273.0], [35.1, 273.0], [35.2, 274.0], [35.3, 274.0], [35.4, 274.0], [35.5, 274.0], [35.6, 275.0], [35.7, 276.0], [35.8, 276.0], [35.9, 276.0], [36.0, 277.0], [36.1, 277.0], [36.2, 277.0], [36.3, 277.0], [36.4, 277.0], [36.5, 277.0], [36.6, 278.0], [36.7, 278.0], [36.8, 279.0], [36.9, 279.0], [37.0, 279.0], [37.1, 279.0], [37.2, 279.0], [37.3, 280.0], [37.4, 280.0], [37.5, 280.0], [37.6, 280.0], [37.7, 281.0], [37.8, 281.0], [37.9, 281.0], [38.0, 282.0], [38.1, 282.0], [38.2, 282.0], [38.3, 282.0], [38.4, 283.0], [38.5, 283.0], [38.6, 283.0], [38.7, 283.0], [38.8, 283.0], [38.9, 283.0], [39.0, 283.0], [39.1, 283.0], [39.2, 284.0], [39.3, 284.0], [39.4, 284.0], [39.5, 284.0], [39.6, 285.0], [39.7, 285.0], [39.8, 285.0], [39.9, 285.0], [40.0, 285.0], [40.1, 286.0], [40.2, 286.0], [40.3, 286.0], [40.4, 286.0], [40.5, 286.0], [40.6, 286.0], [40.7, 287.0], [40.8, 287.0], [40.9, 287.0], [41.0, 287.0], [41.1, 287.0], [41.2, 288.0], [41.3, 288.0], [41.4, 288.0], [41.5, 289.0], [41.6, 289.0], [41.7, 289.0], [41.8, 290.0], [41.9, 290.0], [42.0, 290.0], [42.1, 290.0], [42.2, 290.0], [42.3, 291.0], [42.4, 291.0], [42.5, 291.0], [42.6, 291.0], [42.7, 292.0], [42.8, 292.0], [42.9, 292.0], [43.0, 293.0], [43.1, 293.0], [43.2, 293.0], [43.3, 293.0], [43.4, 293.0], [43.5, 294.0], [43.6, 294.0], [43.7, 294.0], [43.8, 294.0], [43.9, 294.0], [44.0, 295.0], [44.1, 295.0], [44.2, 295.0], [44.3, 295.0], [44.4, 296.0], [44.5, 296.0], [44.6, 296.0], [44.7, 297.0], [44.8, 297.0], [44.9, 297.0], [45.0, 297.0], [45.1, 297.0], [45.2, 297.0], [45.3, 298.0], [45.4, 298.0], [45.5, 298.0], [45.6, 298.0], [45.7, 298.0], [45.8, 298.0], [45.9, 298.0], [46.0, 299.0], [46.1, 299.0], [46.2, 299.0], [46.3, 299.0], [46.4, 299.0], [46.5, 300.0], [46.6, 300.0], [46.7, 300.0], [46.8, 300.0], [46.9, 300.0], [47.0, 300.0], [47.1, 301.0], [47.2, 301.0], [47.3, 301.0], [47.4, 301.0], [47.5, 301.0], [47.6, 301.0], [47.7, 301.0], [47.8, 302.0], [47.9, 302.0], [48.0, 302.0], [48.1, 302.0], [48.2, 302.0], [48.3, 302.0], [48.4, 302.0], [48.5, 302.0], [48.6, 303.0], [48.7, 303.0], [48.8, 303.0], [48.9, 303.0], [49.0, 303.0], [49.1, 303.0], [49.2, 303.0], [49.3, 304.0], [49.4, 304.0], [49.5, 304.0], [49.6, 304.0], [49.7, 304.0], [49.8, 304.0], [49.9, 305.0], [50.0, 305.0], [50.1, 305.0], [50.2, 305.0], [50.3, 305.0], [50.4, 306.0], [50.5, 306.0], [50.6, 306.0], [50.7, 307.0], [50.8, 307.0], [50.9, 307.0], [51.0, 307.0], [51.1, 307.0], [51.2, 308.0], [51.3, 308.0], [51.4, 308.0], [51.5, 308.0], [51.6, 309.0], [51.7, 309.0], [51.8, 309.0], [51.9, 309.0], [52.0, 310.0], [52.1, 310.0], [52.2, 310.0], [52.3, 310.0], [52.4, 310.0], [52.5, 311.0], [52.6, 311.0], [52.7, 311.0], [52.8, 311.0], [52.9, 311.0], [53.0, 312.0], [53.1, 312.0], [53.2, 312.0], [53.3, 312.0], [53.4, 312.0], [53.5, 312.0], [53.6, 312.0], [53.7, 313.0], [53.8, 313.0], [53.9, 313.0], [54.0, 313.0], [54.1, 313.0], [54.2, 314.0], [54.3, 314.0], [54.4, 314.0], [54.5, 314.0], [54.6, 314.0], [54.7, 314.0], [54.8, 314.0], [54.9, 315.0], [55.0, 315.0], [55.1, 315.0], [55.2, 315.0], [55.3, 315.0], [55.4, 315.0], [55.5, 315.0], [55.6, 316.0], [55.7, 316.0], [55.8, 316.0], [55.9, 316.0], [56.0, 316.0], [56.1, 316.0], [56.2, 316.0], [56.3, 317.0], [56.4, 317.0], [56.5, 317.0], [56.6, 317.0], [56.7, 317.0], [56.8, 317.0], [56.9, 317.0], [57.0, 318.0], [57.1, 318.0], [57.2, 318.0], [57.3, 318.0], [57.4, 318.0], [57.5, 318.0], [57.6, 318.0], [57.7, 319.0], [57.8, 319.0], [57.9, 319.0], [58.0, 319.0], [58.1, 319.0], [58.2, 320.0], [58.3, 320.0], [58.4, 320.0], [58.5, 320.0], [58.6, 320.0], [58.7, 321.0], [58.8, 321.0], [58.9, 321.0], [59.0, 321.0], [59.1, 321.0], [59.2, 322.0], [59.3, 322.0], [59.4, 322.0], [59.5, 322.0], [59.6, 323.0], [59.7, 323.0], [59.8, 323.0], [59.9, 323.0], [60.0, 323.0], [60.1, 324.0], [60.2, 324.0], [60.3, 324.0], [60.4, 324.0], [60.5, 324.0], [60.6, 325.0], [60.7, 325.0], [60.8, 325.0], [60.9, 325.0], [61.0, 326.0], [61.1, 326.0], [61.2, 326.0], [61.3, 326.0], [61.4, 326.0], [61.5, 327.0], [61.6, 327.0], [61.7, 327.0], [61.8, 327.0], [61.9, 328.0], [62.0, 328.0], [62.1, 328.0], [62.2, 328.0], [62.3, 328.0], [62.4, 328.0], [62.5, 329.0], [62.6, 329.0], [62.7, 329.0], [62.8, 329.0], [62.9, 329.0], [63.0, 329.0], [63.1, 330.0], [63.2, 330.0], [63.3, 330.0], [63.4, 330.0], [63.5, 330.0], [63.6, 331.0], [63.7, 331.0], [63.8, 331.0], [63.9, 331.0], [64.0, 331.0], [64.1, 331.0], [64.2, 331.0], [64.3, 331.0], [64.4, 331.0], [64.5, 332.0], [64.6, 332.0], [64.7, 332.0], [64.8, 332.0], [64.9, 332.0], [65.0, 333.0], [65.1, 333.0], [65.2, 333.0], [65.3, 333.0], [65.4, 333.0], [65.5, 333.0], [65.6, 334.0], [65.7, 334.0], [65.8, 334.0], [65.9, 334.0], [66.0, 334.0], [66.1, 334.0], [66.2, 334.0], [66.3, 335.0], [66.4, 335.0], [66.5, 335.0], [66.6, 335.0], [66.7, 335.0], [66.8, 336.0], [66.9, 336.0], [67.0, 336.0], [67.1, 336.0], [67.2, 336.0], [67.3, 336.0], [67.4, 337.0], [67.5, 337.0], [67.6, 337.0], [67.7, 337.0], [67.8, 338.0], [67.9, 338.0], [68.0, 338.0], [68.1, 339.0], [68.2, 339.0], [68.3, 339.0], [68.4, 339.0], [68.5, 340.0], [68.6, 340.0], [68.7, 340.0], [68.8, 341.0], [68.9, 341.0], [69.0, 341.0], [69.1, 341.0], [69.2, 341.0], [69.3, 342.0], [69.4, 342.0], [69.5, 342.0], [69.6, 343.0], [69.7, 343.0], [69.8, 343.0], [69.9, 343.0], [70.0, 343.0], [70.1, 344.0], [70.2, 344.0], [70.3, 344.0], [70.4, 345.0], [70.5, 345.0], [70.6, 345.0], [70.7, 346.0], [70.8, 346.0], [70.9, 346.0], [71.0, 346.0], [71.1, 346.0], [71.2, 347.0], [71.3, 347.0], [71.4, 347.0], [71.5, 347.0], [71.6, 348.0], [71.7, 348.0], [71.8, 348.0], [71.9, 348.0], [72.0, 348.0], [72.1, 349.0], [72.2, 349.0], [72.3, 349.0], [72.4, 349.0], [72.5, 349.0], [72.6, 349.0], [72.7, 349.0], [72.8, 349.0], [72.9, 350.0], [73.0, 350.0], [73.1, 350.0], [73.2, 350.0], [73.3, 350.0], [73.4, 350.0], [73.5, 351.0], [73.6, 351.0], [73.7, 351.0], [73.8, 351.0], [73.9, 352.0], [74.0, 352.0], [74.1, 352.0], [74.2, 352.0], [74.3, 352.0], [74.4, 353.0], [74.5, 353.0], [74.6, 353.0], [74.7, 353.0], [74.8, 354.0], [74.9, 354.0], [75.0, 354.0], [75.1, 355.0], [75.2, 355.0], [75.3, 355.0], [75.4, 355.0], [75.5, 356.0], [75.6, 356.0], [75.7, 356.0], [75.8, 357.0], [75.9, 357.0], [76.0, 357.0], [76.1, 358.0], [76.2, 358.0], [76.3, 359.0], [76.4, 359.0], [76.5, 359.0], [76.6, 360.0], [76.7, 360.0], [76.8, 360.0], [76.9, 360.0], [77.0, 361.0], [77.1, 361.0], [77.2, 362.0], [77.3, 362.0], [77.4, 362.0], [77.5, 362.0], [77.6, 363.0], [77.7, 363.0], [77.8, 363.0], [77.9, 364.0], [78.0, 364.0], [78.1, 364.0], [78.2, 364.0], [78.3, 364.0], [78.4, 364.0], [78.5, 365.0], [78.6, 365.0], [78.7, 365.0], [78.8, 365.0], [78.9, 365.0], [79.0, 366.0], [79.1, 366.0], [79.2, 366.0], [79.3, 366.0], [79.4, 366.0], [79.5, 367.0], [79.6, 367.0], [79.7, 367.0], [79.8, 367.0], [79.9, 368.0], [80.0, 368.0], [80.1, 368.0], [80.2, 368.0], [80.3, 368.0], [80.4, 369.0], [80.5, 369.0], [80.6, 369.0], [80.7, 369.0], [80.8, 369.0], [80.9, 370.0], [81.0, 370.0], [81.1, 370.0], [81.2, 370.0], [81.3, 372.0], [81.4, 372.0], [81.5, 373.0], [81.6, 373.0], [81.7, 374.0], [81.8, 374.0], [81.9, 375.0], [82.0, 375.0], [82.1, 376.0], [82.2, 376.0], [82.3, 376.0], [82.4, 377.0], [82.5, 377.0], [82.6, 378.0], [82.7, 379.0], [82.8, 379.0], [82.9, 380.0], [83.0, 380.0], [83.1, 381.0], [83.2, 381.0], [83.3, 381.0], [83.4, 381.0], [83.5, 381.0], [83.6, 382.0], [83.7, 382.0], [83.8, 382.0], [83.9, 382.0], [84.0, 382.0], [84.1, 382.0], [84.2, 383.0], [84.3, 383.0], [84.4, 383.0], [84.5, 383.0], [84.6, 383.0], [84.7, 383.0], [84.8, 383.0], [84.9, 384.0], [85.0, 384.0], [85.1, 384.0], [85.2, 384.0], [85.3, 385.0], [85.4, 385.0], [85.5, 385.0], [85.6, 386.0], [85.7, 386.0], [85.8, 386.0], [85.9, 387.0], [86.0, 387.0], [86.1, 388.0], [86.2, 388.0], [86.3, 388.0], [86.4, 390.0], [86.5, 390.0], [86.6, 391.0], [86.7, 391.0], [86.8, 392.0], [86.9, 392.0], [87.0, 393.0], [87.1, 394.0], [87.2, 395.0], [87.3, 396.0], [87.4, 396.0], [87.5, 397.0], [87.6, 398.0], [87.7, 398.0], [87.8, 399.0], [87.9, 399.0], [88.0, 401.0], [88.1, 402.0], [88.2, 402.0], [88.3, 403.0], [88.4, 403.0], [88.5, 403.0], [88.6, 404.0], [88.7, 404.0], [88.8, 405.0], [88.9, 405.0], [89.0, 406.0], [89.1, 406.0], [89.2, 407.0], [89.3, 409.0], [89.4, 410.0], [89.5, 411.0], [89.6, 411.0], [89.7, 411.0], [89.8, 411.0], [89.9, 412.0], [90.0, 413.0], [90.1, 414.0], [90.2, 415.0], [90.3, 415.0], [90.4, 416.0], [90.5, 416.0], [90.6, 416.0], [90.7, 417.0], [90.8, 417.0], [90.9, 417.0], [91.0, 418.0], [91.1, 418.0], [91.2, 418.0], [91.3, 419.0], [91.4, 419.0], [91.5, 420.0], [91.6, 420.0], [91.7, 423.0], [91.8, 425.0], [91.9, 426.0], [92.0, 427.0], [92.1, 428.0], [92.2, 429.0], [92.3, 429.0], [92.4, 430.0], [92.5, 430.0], [92.6, 431.0], [92.7, 431.0], [92.8, 432.0], [92.9, 433.0], [93.0, 434.0], [93.1, 435.0], [93.2, 435.0], [93.3, 436.0], [93.4, 436.0], [93.5, 437.0], [93.6, 438.0], [93.7, 439.0], [93.8, 440.0], [93.9, 442.0], [94.0, 442.0], [94.1, 445.0], [94.2, 445.0], [94.3, 446.0], [94.4, 447.0], [94.5, 449.0], [94.6, 449.0], [94.7, 450.0], [94.8, 450.0], [94.9, 452.0], [95.0, 453.0], [95.1, 454.0], [95.2, 454.0], [95.3, 457.0], [95.4, 460.0], [95.5, 461.0], [95.6, 462.0], [95.7, 463.0], [95.8, 464.0], [95.9, 465.0], [96.0, 466.0], [96.1, 469.0], [96.2, 471.0], [96.3, 474.0], [96.4, 477.0], [96.5, 479.0], [96.6, 481.0], [96.7, 483.0], [96.8, 484.0], [96.9, 485.0], [97.0, 487.0], [97.1, 489.0], [97.2, 495.0], [97.3, 496.0], [97.4, 498.0], [97.5, 499.0], [97.6, 502.0], [97.7, 507.0], [97.8, 510.0], [97.9, 518.0], [98.0, 523.0], [98.1, 528.0], [98.2, 533.0], [98.3, 534.0], [98.4, 536.0], [98.5, 546.0], [98.6, 551.0], [98.7, 561.0], [98.8, 564.0], [98.9, 567.0], [99.0, 569.0], [99.1, 575.0], [99.2, 583.0], [99.3, 591.0], [99.4, 612.0], [99.5, 616.0], [99.6, 632.0], [99.7, 653.0], [99.8, 677.0], [99.9, 747.0], [100.0, 937.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 4143.0, "series": [{"data": [[0.0, 508.0], [300.0, 4143.0], [600.0, 55.0], [700.0, 11.0], [100.0, 877.0], [200.0, 3264.0], [400.0, 959.0], [800.0, 3.0], [900.0, 1.0], [500.0, 179.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 900.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 248.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 9752.0, "series": [{"data": [[0.0, 9752.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 248.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 1.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 9.160042964554249, "minX": 1.62143658E12, "maxY": 10.0, "series": [{"data": [[1.6214367E12, 10.0], [1.62143664E12, 10.0], [1.62143682E12, 10.0], [1.62143676E12, 10.0], [1.62143688E12, 9.328947368421067], [1.62143658E12, 9.160042964554249]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.62143688E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 28.0, "minX": 1.0, "maxY": 304.85260603502763, "series": [{"data": [[1.0, 28.0], [2.0, 44.800000000000004], [4.0, 96.03703703703705], [8.0, 210.27999999999997], [9.0, 234.06153846153848], [5.0, 131.4], [10.0, 304.85260603502763], [3.0, 80.0], [6.0, 164.31818181818178], [7.0, 155.75000000000006]], "isOverall": false, "label": "HTTP Request", "isController": false}, {"data": [[9.840200000000026, 298.1657000000008]], "isOverall": false, "label": "HTTP Request-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 10.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 2374.05, "minX": 1.62143658E12, "maxY": 1282381.65, "series": [{"data": [[1.6214367E12, 1214854.35], [1.62143664E12, 1272825.9], [1.62143682E12, 1282381.65], [1.62143676E12, 1232691.75], [1.62143688E12, 774652.8], [1.62143658E12, 593093.55]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.6214367E12, 4862.85], [1.62143664E12, 5094.9], [1.62143682E12, 5133.15], [1.62143676E12, 4934.25], [1.62143688E12, 3100.8], [1.62143658E12, 2374.05]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.62143688E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 263.9613319011818, "minX": 1.62143658E12, "maxY": 314.17147351861536, "series": [{"data": [[1.6214367E12, 314.17147351861536], [1.62143664E12, 300.38388388388404], [1.62143682E12, 298.58917039244966], [1.62143676E12, 310.1064599483199], [1.62143688E12, 275.90542763157936], [1.62143658E12, 263.9613319011818]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.62143688E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 160.59613319011834, "minX": 1.62143658E12, "maxY": 190.69847928683797, "series": [{"data": [[1.6214367E12, 190.69847928683797], [1.62143664E12, 182.96746746746712], [1.62143682E12, 180.76304023844978], [1.62143676E12, 189.40000000000015], [1.62143688E12, 168.67927631578974], [1.62143658E12, 160.59613319011834]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.62143688E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.62143658E12, "maxY": 0.02363050483351238, "series": [{"data": [[1.6214367E12, 0.003146303093864708], [1.62143664E12, 0.001001001001001004], [1.62143682E12, 0.013909587680079483], [1.62143676E12, 0.002583979328165375], [1.62143688E12, 0.0], [1.62143658E12, 0.02363050483351238]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.62143688E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 4.0, "minX": 1.62143658E12, "maxY": 937.0, "series": [{"data": [[1.6214367E12, 937.0], [1.62143664E12, 833.0], [1.62143682E12, 784.0], [1.62143676E12, 754.0], [1.62143688E12, 725.0], [1.62143658E12, 667.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.6214367E12, 6.0], [1.62143664E12, 5.0], [1.62143682E12, 6.0], [1.62143676E12, 6.423999538421633], [1.62143688E12, 5.0], [1.62143658E12, 5.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.6214367E12, 6.0], [1.62143664E12, 5.0], [1.62143682E12, 6.0], [1.62143676E12, 7.0], [1.62143688E12, 5.0], [1.62143658E12, 5.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.6214367E12, 6.0], [1.62143664E12, 5.0], [1.62143682E12, 6.0], [1.62143676E12, 7.0], [1.62143688E12, 5.0], [1.62143658E12, 5.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.6214367E12, 4.0], [1.62143664E12, 4.0], [1.62143682E12, 4.0], [1.62143676E12, 4.0], [1.62143688E12, 4.0], [1.62143658E12, 4.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.6214367E12, 318.0], [1.62143664E12, 303.0], [1.62143682E12, 304.0], [1.62143676E12, 317.0], [1.62143688E12, 285.0], [1.62143658E12, 286.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.62143688E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 148.0, "minX": 17.0, "maxY": 509.0, "series": [{"data": [[32.0, 330.0], [33.0, 303.0], [35.0, 305.0], [34.0, 313.0], [36.0, 285.0], [37.0, 291.5], [38.0, 276.0], [39.0, 274.0], [40.0, 268.0], [41.0, 273.0], [43.0, 287.0], [42.0, 274.5], [45.0, 248.0], [44.0, 273.5], [47.0, 205.0], [46.0, 148.0], [17.0, 509.0], [19.0, 377.5], [21.0, 293.5], [22.0, 385.0], [23.0, 363.0], [24.0, 354.0], [25.0, 381.0], [26.0, 388.5], [27.0, 333.5], [28.0, 337.0], [29.0, 329.0], [30.0, 322.5], [31.0, 327.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 47.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 100.5, "minX": 17.0, "maxY": 331.0, "series": [{"data": [[32.0, 182.5], [33.0, 176.0], [35.0, 175.0], [34.0, 175.5], [36.0, 161.0], [37.0, 167.0], [38.0, 161.5], [39.0, 160.0], [40.0, 154.5], [41.0, 163.5], [43.0, 159.0], [42.0, 161.0], [45.0, 153.0], [44.0, 135.5], [47.0, 128.0], [46.0, 100.5], [17.0, 331.0], [19.0, 239.0], [21.0, 184.5], [22.0, 228.5], [23.0, 203.0], [24.0, 209.5], [25.0, 224.0], [26.0, 244.0], [27.0, 190.5], [28.0, 203.0], [29.0, 193.0], [30.0, 198.5], [31.0, 204.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 47.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 15.683333333333334, "minX": 1.62143658E12, "maxY": 33.55, "series": [{"data": [[1.6214367E12, 31.783333333333335], [1.62143664E12, 33.3], [1.62143682E12, 33.55], [1.62143676E12, 32.25], [1.62143688E12, 20.1], [1.62143658E12, 15.683333333333334]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.62143688E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 15.516666666666667, "minX": 1.62143658E12, "maxY": 33.55, "series": [{"data": [[1.6214367E12, 31.783333333333335], [1.62143664E12, 33.3], [1.62143682E12, 33.55], [1.62143676E12, 32.25], [1.62143688E12, 20.266666666666666], [1.62143658E12, 15.516666666666667]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.62143688E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 15.516666666666667, "minX": 1.62143658E12, "maxY": 33.55, "series": [{"data": [[1.6214367E12, 31.783333333333335], [1.62143664E12, 33.3], [1.62143682E12, 33.55], [1.62143676E12, 32.25], [1.62143688E12, 20.266666666666666], [1.62143658E12, 15.516666666666667]], "isOverall": false, "label": "HTTP Request-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.62143688E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 15.516666666666667, "minX": 1.62143658E12, "maxY": 33.55, "series": [{"data": [[1.6214367E12, 31.783333333333335], [1.62143664E12, 33.3], [1.62143682E12, 33.55], [1.62143676E12, 32.25], [1.62143688E12, 20.266666666666666], [1.62143658E12, 15.516666666666667]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.62143688E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

