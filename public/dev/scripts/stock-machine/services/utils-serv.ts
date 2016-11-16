declare var $: any;
declare var _: any;
declare var angular: any;

angular.module('stockMachineApp').service('UtilsServ', class UtilsServ {

    //Return average of all numeric items in an array
    avg(arr) {
        //If is an object, not an array
        if (angular.isObject(arr)) {
            arr = _.values(arr);
        }

        //Manually calculate the average, excluding values that are not numbers (e.g. null, NaN, undefined, etc)
        var sum = 0;
        var count = 0;
        angular.forEach(arr, function(val){
            if (this.isNum(val)) {
                sum += val;
                count++;
            }
        });

        return sum/count;
    }

    //Checks if is a number
    isNum(val) {
        return $.isNumeric(val);
    }

    //Convert value(s) to a number(s). Non-numbers will remain unchanged
    toNum(mixed) {
        var self = this;

        //If mixed is an array or object, use recursion
        if (angular.isArray(mixed) || angular.isObject(mixed)) {
            angular.forEach(mixed, function(val, key){
                var result = self.toNum(val);
                if (self.isNum(result)) {
                    mixed[key] = result;
                }
            });

            return mixed;

        } else {
            var val = mixed;
            var multBy = 1;
            var result;

            try {
                if ((/bil/i).test(val)) {
                    val = val.replace(/bil/i, '');
                    multBy = 1000000000;
                }
                if ((/mil/i).test(val)) {
                    val = val.replace(/mil/i, '');
                    multBy = 1000000;
                }

                result = parseInt(val);
                if (this.isNum(result)) {
                    result = result * multBy;
                } else {
                    result = val;
                }
            } catch(error) {
            }

            return result;
        }
    }

    //Round to 2 decimal places
    round(num) {
        num = this.toNum(num);

        if (this.isNum(num)) {
            num = _.round(num, 2);
        }

        return num;
    }
});
