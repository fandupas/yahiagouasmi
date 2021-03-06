/**
 * Copyright (c) 2014 Ecofic LLC. All rights reserved.
 * http://www.ecofic.com

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

/**
 * @ngdoc service
 * @name ngCordovaMocks.cordovaVibration
 *
 * @description
 * A service for testing vibration
 * in an app build with ngCordova.
 */ 
ngCordovaMocks.factory('$cordovaVibration', ['$timeout', function($timeout) {
	var isVibrating = false;
	var vibrateTimer = null;

	return {
		/**
		 * @ngdoc property
		 * @name vibrateTimer
		 * @propertyOf ngCordovaMocks.cordovaVibration
		 *
		 * @description
		 * Access to the timer associated with vibration.
		 * This property should only be used in automated tests.
		**/
		vibrateTimer: vibrateTimer,

		/**
		 * @ngdoc property
		 * @name isVibrating
		 * @propertyOf ngCordovaMocks.cordovaVibration
		 *
		 * @description
		 * A flag that signals whether vibration is active.
		 * This property should only be used in automated tests.
		**/				
		isVibrating: isVibrating,

		vibrate: function(time) {
			if (time > 0) {
				this.isVibrating = true;
				self = this;

				if (time instanceof Array) {
					// TODO: Implement pattern here.
					// The following is a temporary timer that just looks at the first value
					this.vibrateTimer = $timeout(
						function() {
							self.isVibrating = false;
							self.vibrateTimer = null;
						},
						time[0]
					);					
				} else {
					this.vibrateTimer = $timeout(
						function() {
							self.isVibrating = false;
							self.vibrateTimer = null;
						},
						time
					);					
				}
			}
		},

		/* jshint ignore:start */
		vibrateWithPattern: function(pattern, repeat) {
			// Based on the documentation (https://github.com/apache/cordova-plugin-vibration/blob/master/doc/index.md)
			// This method is deprecated. For that reason, this isn't implemented at this time.
		},
		/* jshint ignore:end */

		cancelVibration: function() {
			if (this.vibrateTimer !== null) {
				if (this.isVibrating === true) {
					$timeout.cancel(this.vibrateTimer);
					this.isVibrating = false;
				}
			}
		}
	};
}]);