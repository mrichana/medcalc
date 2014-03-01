(function() {
	'use strict';
	/**
	 * calculators Module
	 *
	 * Available calculators
	 */
	angular.module('medicalCalculator.panels').
	factory('calculators', function() {
		var roundNum = function(thisNum, dec) {
			thisNum = thisNum * Math.pow(10, dec);
			thisNum = Math.round(thisNum);
			thisNum = thisNum / Math.pow(10, dec);
			return thisNum;
		};
		var fieldFromAnyValue = function(value, field, array) {
			return _.find(array, function(iterator) {
				return iterator[field] === value;
			});
		};
		var fieldFromId = function(id, array) {
			return fieldFromAnyValue(id, "id", array);
		};
		var val = function(id, array) {
			var field = fieldFromId(id, array);
			var ret = field.value;
			if (field.input.type == "check") {
				ret = ret * (field.input.multiplier || 1);
			}
			return ret;
		};


		return {
			abg: {
				id: "abg",
				name: "Αέρια Αίματος",
				type: "basic",
				template: "calculator.basic",
				fields: [{
					id: "pH",
					name: "pH",
					value: 7.40,
					input: {
						type: "number",
						step: 0.01,
						min: 6,
						max: 8
					}
				}, {
					id: "pO2",
					name: "pO<sub>2</sub>(mmHg)",
					value: 100,
					input: {
						type: "number",
						step: 1,
						min: 1,
						max: 200
					}
				}, {
					id: "pCO2",
					name: "pCO<sub>2</sub>(mmHg)",
					value: 40,
					input: {
						type: "number",
						step: 1,
						min: 1,
						max: 100
					}
				}, {
					id: "H2CO3",
					name: "H<sub>2</sub>CO<sub>3</sub>(mEq/L)",
					value: 24,
					input: {
						type: "number",
						step: 1,
						min: 1,
						max: 100
					}
				}, {
					id: "FiO2",
					name: "FiO2(%)",
					value: 0.21,
					input: {
						type: "select",
						options: [{
							value: 0.21,
							name: "21% (Ατμοσφαιρικός Αέρας)"
						}, {
							value: 0.24,
							name: "24% (Ρινικό 1lt ή Ventouri 24%)"
						}, {
							value: 0.28,
							name: "28% (Ρινικό 2lt ή Ventouri 28%)"
						}, {
							value: 0.31,
							name: "31% (Ventouri 31%)"
						}, {
							value: 0.35,
							name: "35% (Ventouri 35%)"
						}, {
							value: 0.40,
							name: "40% (Ventouri 40%)"
						}, {
							value: 0.50,
							name: "50% (Ventouri 50%)"
						}, {
							value: 0.60,
							name: "60% (Ventouri 60%)"
						}]
					}
				}],
				calc: function(newValue, oldValue, scope) {
					var pH = val("pH", newValue);
					var pO2 = val("pO2", newValue);
					var pCO2 = val("pCO2", newValue);
					var H2CO3 = val("H2CO3", newValue);
					var FiO2 = val("FiO2", newValue);

					var eph = roundNum(6.1 + Math.log(H2CO3 / (pCO2 * 0.0301)) / Math.log(10), 2);
					var eH2CO3 = roundNum(Math.pow(10, (pH - 6.1)) * 0.0301 * pCO2, 0);
					var eco2 = roundNum(H2CO3 / (0.0301 * Math.pow(10, (pH - 6.1))), 0);

					var expectedPco2, expectedText, phHigh, phLow, hco3High, hco3Low, ehco3, agap;
					var result = "",
						explanation = "",
						resultlevel;

					//  Primary Metabolic Disorders
					if ((pH < 7.36) && (pCO2 <= 40)) {
						result = "Πρωτοπαθής μεταβολική οξέωση";
						expectedPco2 = 1.5 * H2CO3 + 8;
					}

					if ((pH > 7.44) && (pCO2 >= 40)) {
						result = "Πρωτοπαθής μεταβολική αλκάλωση";
						expectedPco2 = 0.7 * H2CO3 + 21;
					}

					expectedPco2 = roundNum(expectedPco2, 0);

					if (pCO2 > (expectedPco2 + 2)) {
						result += ",\nμε αναπνευστική οξέωση";
						resultlevel = 2;
					}
					if (pCO2 < (expectedPco2 - 2)) {
						result += ",\nμε αναπνευστική αλκάλωση";
						resultlevel = 2;
					}
					if ((pCO2 <= (expectedPco2 + 2)) && (pCO2 >= (expectedPco2 - 2))) {
						result += ",\nμε πλήρη αναπνευστική αντιρρόπηση";
						resultlevel = 1;
					}

					//  Primary Respiratory Disorders
					if ((pH < 7.4) && (pCO2 > 44)) {
						result = "Πρωτοπαθής αναπνευστική οξέωση";

						phHigh = 7.4 - (0.003 * (pCO2 - 40));
						phLow = 7.4 - (0.008 * (pCO2 - 40));
						hco3High = 24 + (0.35 * (pCO2 - 40));
						hco3Low = 24 + (0.1 * (pCO2 - 40));

						phLow = roundNum(phLow, 2);
						phHigh = roundNum(phHigh, 2);
						hco3Low = roundNum(hco3Low, 0);
						hco3High = roundNum(hco3High, 0);

						if (pH <= (phLow + 0.02)) {
							result = "Οξεία (μη αντιρροπούμενη) " + result;
							if (H2CO3 < (hco3Low - 2)) {
								result += ",\nμε μεταβολική οξέωση";
								resultlevel = 3;
							}
						}

						if (pH >= (phHigh - 0.02001)) {
							result = "Χρόνια (αντιρροπούμενη) " + result;
							if (H2CO3 > (hco3High + 2)) {
								result += ",\nμε μεταβολική αλκάλωση";
								resultlevel = 1;
							}
						}

						if ((pH > (phLow + 0.02)) && (pH < (phHigh - 0.02001))) {
							result = "(1) μερικώς αντιρροπούμενη πρωτοπαθής αναπνευστική οξέωση, ή\n" +
								"(2) οξέια επί χρόνιας " + result + ", ή\n" +
								"(3) μικτή οξεία αναπνευστική οξέωση με μικρή μεταβολική αλκάλωση";
								resultlevel = 2;

						}
					}

					if ((pH > 7.4) && (pCO2 < 36)) {
						result = "Πρωτοπαθής αναπνευστική αλκάλωση";
						phLow = 7.4 + (0.0017 * (40 - pCO2));
						phHigh = 7.4 + (0.008 * (40 - pCO2));
						hco3Low = 24 - (0.5 * (40 - pCO2));
						hco3High = 24 - (0.25 * (40 - pCO2));

						phLow = roundNum(phLow, 2);
						phHigh = roundNum(phHigh, 2);
						hco3Low = roundNum(hco3Low, 0);
						hco3High = roundNum(hco3High, 0);

						if (pH <= (phLow + 0.02)) {
							result = "Χρόνια (αντιρροπούμενη) " + result;
							if (H2CO3 < (hco3Low - 2)) {
								result += ",\nμε μεταβολική οξέωση";
							}
							resultlevel = 1;
						}

						if (pH >= (phHigh - 0.02)) {
							result = "Οξεία (μη αντιρροπούμενη) " + result;
							if (H2CO3 > (hco3High + 2)) {
								result += ",\nμε μεταβολική αλκάλωση";
							}
							resultlevel = 3;
						}

						if ((pH > (phLow + 0.02)) && (pH < (phHigh - 0.02))) {
							result = "(1) μερικώς αντιρροπούμενη πρωτοπαθής αναπνευστική αλκάλωση, ή\n" +
								"(2) οξεία επί χρόνιας " + result + ", ή\n" +
								"(3) μικτή οξεία αναπνευστική αλκάλωση με μικρή μεταβολική οξέωση";
								resultlevel = 2;
						}
					}

					//  Mixed Acid-Base Disorders
					if ((result === "") || (result === null)) {
						if ((pH >= 7.36) && (pH <= 7.44)) {
							if ((pCO2 > 40) && (H2CO3 > 26)) {
								result = "Μικτή αναπνευστική οξέωση - μεταβολική αλκάλωση";
								expectedPco2 = 0.7 * H2CO3 + 21;
								resultlevel = 3;
							} else if ((pCO2 < 40) && (H2CO3 < 22)) {
								result = "Μικτή αναπνευστική αλκάλωση - μεταβολική οξέωση";
								expectedPco2 = 1.5 * H2CO3 + 8;
								resultlevel = 3;
							} else {
								result = "Φυσιολογικά αέρια αίματος";
								resultlevel = 0;
							}
						}
					}

					var Aa = roundNum(((FiO2 * 713) - (pCO2 / 0.8)) - pO2, 0);
					if (Aa >= 10) {
						explanation = "Αυξημένο shunt<br />Εκτεταμένες Διαταραχές του V/Q<br />Διαταραχή στην Ανταλλαγή των Αερίων";
					} else if (Aa > 0) {
						explanation = "Υποαερισμός (Κεντρικής Αιτιολογίας, Νευρομυικός κτλ.)<br />Χαμηλή Συγκέντρωση Οξυγόνου (Υψόμετρο κτλ.)";
					}
					return {
						result: result,
						explanation: explanation,
						resultlevel: resultlevel
					};
				}
			},
			bmi: {
				id: "bmi",
				name: "Δείκτης Μάζας Σώματος",
				type: "basic",
				template: "calculator.basic",
				fields: [{
					id: "height",
					name: "Ύψος (cm)",
					value: 170,
					input: {
						type: "number",
						step: 1,
						min: 0,
						max: 250
					}
				}, {
					id: "weight",
					name: "Βάρος (kgr)",
					value: 70,
					input: {
						type: "number",
						step: 1,
						min: 0,
						max: 250
					}
				}],
				calc: function(newValue, oldValue, scope) {
					var weight = val("weight", newValue);
					var height = val("height", newValue);

					var bmi = weight / ((height / 100) * (height / 100));
					var bsa = Math.sqrt((height * weight) / 3600);

					var result;
					if (bmi === null || isNaN(bmi) || bmi === 0 || !isFinite(bmi)) {
						result = "";
					} else {
						result = "BMI:" + bmi.toFixed() + " / BSA:" + roundNum(bsa, 2);
					}

					var explanation;
					var resultlevel;
					
					if (bmi > 40) {
						explanation = "Νοσογόνος Παχυσαρκία";
						resultlevel = 3;
					} else if (bmi > 35) {
						explanation = "Παχύσαρκος";
						resultlevel = 3;
					} else if (bmi > 30) {
						explanation = "Ήπια Παχύσαρκος";
						resultlevel = 2;
					} else if (bmi > 25) {
						explanation = "Υπέρβαρος";
						resultlevel = 1;
					} else if (bmi > 18.5) {
						explanation = "Υγειές Βάρος";
						resultlevel = 0;
					} else if (bmi > 16) {
						explanation = "Ελιποβαρής";
						resultlevel = 1;
					} else if (bmi > 15) {
						explanation = "Έντονα Ελιποβαρής";
						resultlevel = 3;
					} else {
						explanation = "Καχεκτικός";
						resultlevel = 3;
					}

					return {
						result: result,
						explanation: explanation,
						resultlevel: resultlevel
					};
				}
			},
			calculator: {
				id: "calculator",
				name: "Υπολογιστής",
				template: "calculator.singlefield",
				type: "basic",
				fields: [{
					id: "calculation",
					name: "Υπολογισμός",
					value: "",
					input: {
						type: "text"
					}
				}],
				calc: function(newValue, oldValue, scope) {
					var result  = "";
					var explanation = "";
					var resultlevel;

					if (typeof this.calc.error == 'undefined') {
						this.calc.error = false;
					}

					var calculation = val("calculation", newValue);
					try {
						this.calc.error = false;
						result = scope.$new(true).$eval(calculation);
						resultlevel = null;
						//if (isNaN(result)) throw "nan";
					} catch (err) {
						this.calc.error = true;
						result = "";
						resultlevel = 2;
					}
					return {
						result: result,
						explanation: explanation,
						resultlevel: resultlevel
					};
				}
			},
			chad: {
				id: "chad",
				name: "CHAD Score",
				type: "basic",
				template: "calculator.basic",
				fields: [{
					id: "chf",
					name: "Συμφορητική Καρδιακή Ανεπάρκεια",
					value: false,
					input: {
						type: "check"
					}
				}, {
					id: "hypertension",
					name: "Αρτηριακή Υπέρταση",
					value: false,
					input: {
						type: "check"
					}
				}, {
					id: "age",
					name: "Ηλικία",
					value: 0,
					input: {
						type: "select",
						options: [{
							value: 0,
							name: "< 65 ετών"
						}, {
							value: 1,
							name: "65 εώς 75 ετών"
						}, {
							value: 2,
							name: "> 75 ετών"
						}]
					}
				}, {
					id: "diabetes",
					name: "Σακχαρώδης Διαβήτης",
					value: false,
					input: {
						type: "check"
					}
				}, {
					id: "stroke",
					name: "Ιστορικό TIA ή εγκεφαλικού",
					value: false,
					input: {
						type: "check"
					}
				}, {
					id: "vascular",
					name: "Περιφερική Αγγειοπάθεια",
					value: false,
					input: {
						type: "check"
					}
				}, {
					id: "sex",
					name: "Φύλο",
					value: 0,
					input: {
						type: "select",
						options: [{
							value: 0,
							name: "♂ Άρρεν"
						}, {
							value: 1,
							name: "♀ Θήλυ"
						}]
					}
				}],
				calc: function(v, oldValue, scope) {
					var result;
					var explanation;
					var resultlevel;

					result = 0 + val("chf", v) + val("hypertension", v) + parseInt(val("age", v), 10) + val("diabetes", v) + (val("stroke", v) * 2) + val("vascular", v) + parseInt(val("sex", v), 10);

					switch (result) {
						case 0:
							explanation = "Όχι αγωγή";
							resultlevel = 0;
							break;
						case 1:
							explanation = "Αντιπηκτκή Αγωγή με Warfarin (INR 2.0-3.0) ή Dabigatran ή Ασπιρίνη";
							resultlevel = 1;
							break;
						default:
							explanation = "Αντιπηκτκή Αγωγή με Warfarin (INR 2.0-3.0) ή Dabigatran";
							resultlevel = 2;
					}
					return {
						result: "Score: " + result,
						explanation: explanation,
						resultlevel: resultlevel
					};
				}
			},
			crusade: {
				id: "crusade",
				name: "CRUSADE Score",
				type: "basic",
				template: "calculator.basic",
				fields: [{
					id: "ht",
					name: "Αιματοκρίτης κατά την εισαγωγή",
					value: 3,
					input: {
						type: "select",
						options: [{
							value: 0,
							name: ">39.9"
						}, {
							value: 2,
							name: "37-39.9"
						}, {
							value: 3,
							name: "34-36.9"
						}, {
							value: 7,
							name: "31-33.9"
						}, {
							value: 9,
							name: "<31"
						}]
					}
				}, {
					id: "gfr",
					name: "GFR",
					value: 0,
					input: {
						type: "select",
						options: [{
							value: 0,
							name: ">120"
						}, {
							value: 7,
							name: "91-120"
						}, {
							value: 17,
							name: "61-90"
						}, {
							value: 28,
							name: "31-60"
						}, {
							value: 35,
							name: "<30"
						}]
					}
				}, {
					id: "hr",
					name: "Σφίξεις κατά την εισαγωγή",
					value: 1,
					input: {
						type: "select",
						options: [{
							value: 11,
							name: ">120"
						}, {
							value: 10,
							name: "111-120"
						}, {
							value: 8,
							name: "101-110"
						}, {
							value: 6,
							name: "91-100"
						}, {
							value: 3,
							name: "81-90"
						}, {
							value: 1,
							name: "71-80"
						}, {
							value: 0,
							name: "<71"
						}]
					}
				}, {
					id: "bp",
					name: "Συστολική Πίεση κατά την εισαγωγή",
					value: 1,
					input: {
						type: "select",
						options: [{
							value: 5,
							name: ">200"
						}, {
							value: 3,
							name: "181-200"
						}, {
							value: 1,
							name: "121-180"
						}, {
							value: 5,
							name: "101-120"
						}, {
							value: 8,
							name: "91-100"
						}, {
							value: 10,
							name: "<91"
						}]
					}
				}, {
					id: "sn",
					name: "Ιστορικό αγγειακής νόσου",
					value: false, //6
					input: {
						type: "check",
						multiplier: 6
					}
				}, {
					id: "diabetes",
					name: "Σακχαρώδης Διαβήτης",
					value: false, //6
					input: {
						type: "check",
						multiplier: 6
					}
				}, {
					id: "chf",
					name: "Καρδιακή ανεπάρκεια κατά την εισαγωγή",
					value: false, //7
					input: {
						type: "check",
						multiplier: 7
					}
				}, {
					id: "sex",
					name: "Φύλο",
					value: 0,
					input: {
						type: "select",
						options: [{
							value: 0,
							name: "♂ Άρρεν"
						}, {
							value: 8,
							name: "♀ Θήλυ"
						}]
					}
				}],
				calc: function(newValue, oldValue, scope) {
					var result;
					var explanation;
					var resultlevel;
					
					var probability = [2.5, 2.6, 2.7, 2.8, 2.9, 3, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.8, 3.9, 4, 4.1, 4.3, 4.4, 4.6, 4.7, 4.9, 5, 5.2, 5.4, 5.6, 5.7, 5.9, 6.1, 6.3, 6.5, 6.7, 6.9, 7.2, 7.4, 7.6, 7.9, 8.1, 8.4, 8.6, 8.9, 9.2, 9.5, 9.8, 10.1, 10.4, 10.7, 11.1, 11.4, 11.7, 12.1, 12.5, 12.8, 13.2, 13.6, 14, 14.4, 14.9, 15.3, 15.7, 16.2, 16.7, 17.1, 17.6, 18.1, 18.6, 19.2, 19.7, 20.2, 20.8, 21.4, 21.9, 22.5, 23.1, 23.7, 24.4, 25, 25.6, 26.3, 27, 27.6, 28.3, 29, 29.7, 30.4, 31.2, 31.9, 32.6, 33.4, 34.2, 34.9, 35.7, 36.5, 37.3, 38.1, 38.9, 39.7, 40.5, 41.3, 42.2, 43, 43.8];

					result = _(newValue).reduce(function(memo, value) {
						return memo + val(value.id, newValue);
					}, 0);

					explanation = "Πιθανότητα σοβαρής αιμορραγίας κατά την νοσηλεία: " + probability[result] + "%";
					if (probability[result] >= 30) resultlevel = 3;
					else if (probability[result] >= 20) resultlevel = 2;
					else if (probability[result] >= 10) resultlevel = 1;
					else resultlevel = 0;

					return {
						result: result,
						explanation: explanation,
						resultlevel: resultlevel
					};
				}
			},
			euroscore: {
				id: "euroscore",
				name: "EuroSCORE",
				type: "basic",
				template: "calculator.basic",
				fields: [{
					id: "age",
					name: "Ηλικία",
					value: 65,
					input: {
						type: "number",
						step: 1,
						min: 1,
						max: 120
					}
				}, {
					id: "sex",
					name: "Φύλο",
					value: 0,
					input: {
						type: "select",
						options: [{
							value: 0,
							name: "♂ Άρρεν"
						}, {
							value: 0.3304052,
							name: "♀ Θήλυ"
						}]
					}
				}, {
					id: "lung",
					name: "Χ.Α.Π.",
					value: false,
					input: {
						type: "check",
						multiplier: 0.4931341
					}
				}, {
					id: "arteropathy",
					name: "Εξωκαρδιακή Αρτηριοπάθεια",
					value: false,
					input: {
						type: "check",
						multiplier: 0.6558917
					}
				}, {
					id: "neuro",
					name: "Νευρολογική Δυσλειτουργία",
					value: false,
					input: {
						type: "check",
						multiplier: 0.841626
					}
				}, {
					id: "surgery",
					name: "Προηγηθήσα Καρδιοχειρουργική Επέμβαση",
					value: false,
					input: {
						type: "check",
						multiplier: 1.002625
					}
				}, {
					id: "creatinine",
					name: "Κρεατινίνη Πλάσματος > 2.25mg/dl",
					value: false,
					input: {
						type: "check",
						multiplier: 0.6521653
					}
				}, {
					id: "endocarditis",
					name: "Ενεργή Ενδοκαρδίτιδα",
					value: false,
					input: {
						type: "check",
						multiplier: 1.101265
					}
				}, {
					id: "critical",
					name: "Κρίσιμη Προεγχειρητική Κατάσταση",
					value: false,
					input: {
						type: "check",
						multiplier: 0.9058132
					}
				}, {
					id: "angina",
					name: "Στηθάγχη Ηρεμίας",
					value: false,
					input: {
						type: "check",
						multiplier: 0.5677075
					}
				}, {
					id: "lvef",
					name: "Λειτουργία Αρ. Κοιλίας",
					value: 0,
					input: {
						type: "select",
						options: [{
							value: 0,
							name: "Καλή LVEF > 50%"
						}, {
							value: 0.4191643,
							name: "Μέτρια LVEF 30-50%"
						}, {
							value: 1.094443,
							name: "Κακή LVEF < 30%"
						}]
					}
				}, {
					id: "mi",
					name: "Πρόσφατο Έμφραγμα Μυοκαρδίου (90 ημερών)",
					value: false,
					input: {
						type: "check",
						multiplier: 0.5460218
					}
				}, {
					id: "polmhyper",
					name: "Πνευμονική Υπέρταση &gt; 60mmHg",
					value: false,
					input: {
						type: "check",
						multiplier: 0.7676924
					}
				}, {
					id: "emergency",
					name: "Επείγουσα Επέμβαση",
					value: false,
					input: {
						type: "check",
						multiplier: 0.7127953
					}
				}, {
					id: "cabg",
					name: "Απλή Αορτοστεφανιαία Παράκαμψη",
					value: false,
					input: {
						type: "check"
					}
				}, {
					id: "aorta",
					name: "Επέμβαση Θωρακικής Αορτής",
					value: false,
					input: {
						type: "check",
						multiplier: 1.159787
					}
				}, {
					id: "septal",
					name: "Μετεμφραγματική Ρήξη Μεσοκοιλιακού Διαφράγματος",
					value: false,
					input: {
						type: "check",
						multiplier: 1.462009
					}
				}],
				calc: function(newValue, oldValue, scope) {
					var result;
					var explanation;

					if (fieldFromId("aorta", newValue).value || fieldFromId("septal", newValue).value) {
						fieldFromId("cabg", newValue).value = false;
						fieldFromId("cabg", newValue).input.disabled = true;
					} else {
						fieldFromId("cabg", newValue).input.disabled = false;
					}

					if (fieldFromId("cabg", newValue).value) {
						fieldFromId("aorta", newValue).value = false;
						fieldFromId("aorta", newValue).input.disabled = true;
						fieldFromId("septal", newValue).value = false;
						fieldFromId("septal", newValue).input.disabled = true;
					} else {
						fieldFromId("aorta", newValue).input.disabled = false;
						fieldFromId("septal", newValue).input.disabled = false;
					}

					var values = {};

					values.age = 0.0666354 * (val("age", newValue) < 60 ? 1 : val("age", newValue) - 58);
					values.sex = val("sex", newValue);
					values.lung = val("lung", newValue);
					values.arteropathy = val("arteropathy", newValue);
					values.neuro = val("neuro", newValue);
					values.surgery = val("surgery", newValue);
					values.creatinine = val("creatinine", newValue);
					values.endocarditis = val("endocarditis", newValue);
					values.critical = val("critical", newValue);
					values.angina = val("angina", newValue);
					values.lvef = val("lvef", newValue);
					values.mi = val("mi", newValue);
					values.polmhyper = val("polmhyper", newValue);
					values.emergency = val("emergency", newValue);
					values.cabg = !val("cabg", newValue) * 0.5420364;
					values.aorta = val("aorta", newValue);
					values.septal = val("septal", newValue);

					var sup = _(values).reduce(function(memo, value, key, values) {
						return memo += value;
					}, -4.789594);

					var value = Math.exp(sup);
					result = 100 * value / (1 + value);

					if (isFinite(result)) {
						result = "Υπολογιζόμενη Θνητότητα Χειρουργείου " + Math.round(result * 100) / 100 + "%";
					} else {
						result = "";
					}

					return {
						result: result,
						explanation: explanation
					};
				}
			},
			gfr: {
				id: "gfr",
				name: "eGFR",
				type: "basic",
				template: "calculator.basic",
				fields: [{
					id: "creatinine",
					name: "Κρεατινίνη Πλάσματος",
					value: 1.0,
					input: {
						type: "number",
						step: 0.1,
						min: 0.1,
						max: 4
					}
				}, {
					id: "age",
					name: "Ηλικία",
					value: 50,
					input: {
						type: "number",
						step: 1,
						min: 20,
						max: 100
					}
				}, {
					id: "weight",
					name: "Σωματικό Βάρος",
					value: 75,
					input: {
						type: "number",
						step: 1,
						min: 50,
						max: 200
					}
				}, {
					id: "sex",
					name: "Φύλο",
					value: 1,
					input: {
						type: "select",
						options: [{
							value: 1,
							name: "♂ Άρρεν"
						}, {
							value: 0.85,
							name: "♀ Θήλυ"
						}]
					}
				}],
				calc: function(newValue, oldValue, scope) {
					var result;
					var explanation;
					var resultlevel;
					
					result = roundNum((140 - val("age", newValue)) * val("weight", newValue) * val("sex", newValue) / (72 * val("creatinine", newValue)), 0);
					if (result < 90) { explanation = "Νεφρική βλάβη με ήπια μείωση του GFR"; resultlevel = 1;}
					else if (result < 60) { explanation = "Νεφρική βλάβη με μέτρια μείωση του GFR"; resultlevel = 2;}
					else if (result < 30) { explanation = "Νεφρική βλάβη με σοβαρή μείωση του GFR"; resultlevel = 3;}
					else if (result < 15) { explanation = "Νεφρική ανεπάρκεια"; resultlevel = 3;}
					else { explanation = "Φυσιολογική νεφρική λειτουργία"; resultlevel = 0;}
					
					return {
						result: result,
						explanation: explanation,
						resultlevel: resultlevel
					};
				}
			},
			glasgow: {
				id: "glasgow",
				name: "Κλίμακα Γλασκόβης",
				type: "basic",
				template: "calculator.basic",
				fields: [{
					id: "eyes",
					name: "Μάτια",
					value: 4,
					input: {
						type: "select",
						options: [{
							value: 1,
							name: "Παραμένουν κλειστά"
						}, {
							value: 2,
							name: "Ανοίγουν στον πόνο"
						}, {
							value: 3,
							name: "Ανοίγουν στην εντολή"
						}, {
							value: 4,
							name: "Ανοικτά"
						}]
					}
				}, {
					id: "speech",
					name: "Ομιλία",
					value: 5,
					input: {
						type: "select",
						options: [{
							value: 1,
							name: "Κανένας ήχος"
						}, {
							value: 2,
							name: "Άναρθρες κραυγές"
						}, {
							value: 3,
							name: "Ομιλία με ασάφεια"
						}, {
							value: 4,
							name: "Αποπροσανατολισμένος"
						}, {
							value: 5,
							name: "Φυσιολογική Επικοινωνία"
						}]
					}
				}, {
					id: "mobility",
					name: "Κινητικότητα",
					value: 6,
					input: {
						type: "select",
						options: [{
							value: 1,
							name: "Καμία κινητικότητα"
						}, {
							value: 2,
							name: "Εκτείνει στον πόνο(απεγκεφαλισμός)"
						}, {
							value: 3,
							name: "Κάμπτει στον πόνο (αποφλοίωση)"
						}, {
							value: 4,
							name: "Αποσύρει στα επώδυνα ερεθίσματα"
						}, {
							value: 5,
							name: "Εντοπίζει τα επώδυνα ερεθίσματα"
						}, {
							value: 6,
							name: "Εκτελεί εντολές"
						}]
					}
				}],
				calc: function(newValue, oldValue, scope) {
					var result;
					var explanation;
					var resultlevel;


					result = _(newValue).reduce(function(memo, value) {
						return memo + val(value.id, newValue);
					}, 0);

					if (result > 13) {
						explanation = "Καμμία ή Μικρή Βαθμού Εγκεφαλική Βλαβη";
						resultlevel = 0;
					} else if (result > 8) {
						explanation = "Μέτριου Βαθμού Εγκεφαλική Βλάβη";
						resultlevel = 2;
					} else if (result > 0) {
						explanation = "Σοβαρού Βαθμού Εγκεφαλική Βλάβη (Διασωλήνωση)";
						resultlevel = 3;
					} else {
						explanation = "";
					}

					return {
						result: result,
						explanation: explanation,
						resultlevel: resultlevel
					};
				}
			},
			grace: {
				id: "grace",
				name: "GRACE Score",
				type: "basic",
				template: "calculator.basic",
				fields: [{
					id: "arrest",
					name: "Καρδιακή Ανακοπή",
					value: false,
					input: {
						type: "check"
					}
				}, {
					id: "stemi",
					name: "ST Ανάσπαση ή Κατάσπαση",
					value: false,
					input: {
						type: "check"
					}
				}, {
					id: "trop",
					name: "Παρουσία Καρδιοενζύμων",
					value: false,
					input: {
						type: "check"
					}
				}, {
					id: "age",
					name: "Ηλικία",
					value: 60,
					input: {
						type: "number",
						step: 1,
						min: 20,
						max: 120
					}
				}, {
					id: "rate",
					name: "Καρδιακή Συχνότητα",
					value: 70,
					input: {
						type: "number",
						step: 1,
						min: 30,
						max: 200
					}
				}, {
					id: "bp",
					name: "Συστολική Πίεση",
					value: 120,
					input: {
						type: "number",
						step: 1,
						min: 60,
						max: 250
					}
				}, {
					id: "creat",
					name: "Κρεατινίνη Πλάσματος",
					value: 1.0,
					input: {
						type: "number",
						step: 0.1,
						min: 0.1,
						max: 10.0
					}
				}, {
					id: "killip",
					name: "Killip Class",
					value: 1,
					input: {
						type: "select",
						options: [{
							value: 1,
							name: "Class I",
							description: "Απουσία κλινικών σημείων καρδιακής ανεπάρκειας"
						}, {
							value: 2,
							name: "Class II",
							description: "Υγροί πνευμονικοί ήχοι, Τρίτος τόνος, Αυξημένη Πίεση Σφαγιτιδικής Φλέβας"
						}, {
							value: 3,
							name: "Class III",
							description: "Οξύ Πνευμονικό Οίδημα"
						}, {
							value: 4,
							name: "Class IV",
							description: "Καρδιογενές Σόκ ή Υπόταση (ΑΠ<90mmHg) και σημεία περιφερικού αγγειόσπασμου (Ολιγουρία, Κυάνωση ή Εφύδρωση)"
						}]
					}
				}],
				calc: function(newValue, oldValue, scope) {
					var result;
					var explanation;

					var arrest = val("arrest", newValue);
					var stemi = val("stemi", newValue);
					var trop = val("trop", newValue);
					var age = val("age", newValue);
					var rate = val("rate", newValue);
					var bp = val("bp", newValue);
					var creat = val("creat", newValue);
					var killip = val("killip", newValue);

					var age2;
					if (0 <= age && age < 35) {
						age2 = 0;
					} else if (35 <= age && age < 45) {
						age2 = 0 + (age - 35) * (1.8);
					} else if (45 <= age && age < 55) {
						age2 = 18 + (age - 45) * (1.8);
					} else if (55 <= age && age < 65) {
						age2 = 36 + (age - 55) * (1.8);
					} else if (65 <= age && age < 75) {
						age2 = 54 + (age - 65) * (1.9);
					} else if (75 <= age && age < 85) {
						age2 = 73 + (age - 75) * (1.8);
					} else if (85 <= age && age < 90) {
						age2 = 91 + (age - 85) * (1.8);
					} else if (age >= 90) {
						age2 = 100;
					}


					var pulse2;
					if (0 <= rate && rate < 70) {
						pulse2 = 0;
					} else if (70 <= rate && rate < 80) {
						pulse2 = 0 + (rate - 70) * (0.3);
					} else if (80 <= rate && rate < 90) {
						pulse2 = 3 + (rate - 80) * (0.2);
					} else if (90 <= rate && rate < 100) {
						pulse2 = 5 + (rate - 90) * (0.3);
					} else if (100 <= rate && rate < 110) {
						pulse2 = 8 + (rate - 100) * (0.2);
					} else if (110 <= rate && rate < 150) {
						pulse2 = 10 + (rate - 110) * (0.3);
					} else if (150 <= rate && rate < 200) {
						pulse2 = 22 + (rate - 150) * (0.3);
					} else if (rate >= 200) {
						pulse2 = 34;
					}


					var sysbp2;
					if (0 <= bp && bp < 80) {
						sysbp2 = 40;
					} else if (80 <= bp && bp < 100) {
						sysbp2 = 40 - (bp - 80) * (0.3);
					} else if (100 <= bp && bp < 110) {
						sysbp2 = 34 - (bp - 100) * (0.3);
					} else if (110 <= bp && bp < 120) {
						sysbp2 = 31 - (bp - 110) * (0.4);
					} else if (120 <= bp && bp < 130) {
						sysbp2 = 27 - (bp - 120) * (0.3);
					} else if (130 <= bp && bp < 140) {
						sysbp2 = 24 - (bp - 130) * (0.3);
					} else if (140 <= bp && bp < 150) {
						sysbp2 = 20 - (bp - 140) * (0.4);
					} else if (150 <= bp && bp < 160) {
						sysbp2 = 17 - (bp - 150) * (0.3);
					} else if (160 <= bp && bp < 180) {
						sysbp2 = 14 - (bp - 160) * (0.3);
					} else if (180 <= bp && bp < 200) {
						sysbp2 = 8 - (bp - 180) * (0.4);
					} else if (bp >= 200) {
						sysbp2 = 0;
					}


					var crt2;
					if (0.0 <= creat && creat < 0.2) {
						crt2 = 0 + (creat - 0) * (1 / 0.2);
					} else if (0.2 <= creat && creat < 0.4) {
						crt2 = 1 + (creat - 0.2) * (2 / 0.2);
					} else if (0.4 <= creat && creat < 0.6) {
						crt2 = 3 + (creat - 0.4) * (1 / 0.2);
					} else if (0.6 <= creat && creat < 0.8) {
						crt2 = 4 + (creat - 0.6) * (2 / 0.2);
					} else if (0.8 <= creat && creat < 1.0) {
						crt2 = 6 + (creat - 0.8) * (1 / 0.2);
					} else if (1.0 <= creat && creat < 1.2) {
						crt2 = 7 + (creat - 1.0) * (1 / 0.2);
					} else if (1.2 <= creat && creat < 1.4) {
						crt2 = 8 + (creat - 1.2) * (2 / 0.2);
					} else if (1.4 <= creat && creat < 1.6) {
						crt2 = 10 + (creat - 1.4) * (1 / 0.2);
					} else if (1.6 <= creat && creat < 1.8) {
						crt2 = 11 + (creat - 1.6) * (2 / 0.2);
					} else if (1.8 <= creat && creat < 2.0) {
						crt2 = 13 + (creat - 1.8) * (1 / 0.2);
					} else if (2.0 <= creat && creat < 3.0) {
						crt2 = 14 + (creat - 2.0) * (7 / 1);
					} else if (3.0 <= creat && creat < 4.0) {
						crt2 = 21 + (creat - 3.0) * (7 / 1);
					} else if (creat >= 4.0) {
						crt2 = 28;
					}

					var chfs;
					if (killip == 1) {
						chfs = 0;
					} else if (killip == 2) {
						chfs = 15;
					} else if (killip == 3) {
						chfs = 29;
					} else if (killip == 4) {
						chfs = 44;
					}

					result = chfs + sysbp2 + pulse2 + age2 + crt2 + 17 * stemi + 13 * trop + 30 * arrest;

					if (result >= 6) {
						explanation = 0.2;
					}
					if (result >= 27) {
						explanation = 0.4;
					}
					if (result >= 39) {
						explanation = 0.6;
					}
					if (result >= 48) {
						explanation = 0.8;
					}
					if (result >= 55) {
						explanation = 1.0;
					}
					if (result >= 60) {
						explanation = 1.2;
					}
					if (result >= 65) {
						explanation = 1.4;
					}
					if (result >= 69) {
						explanation = 1.6;
					}
					if (result >= 73) {
						explanation = 1.8;
					}
					if (result >= 76) {
						explanation = 2;
					}
					if (result >= 88) {
						explanation = 3;
					}
					if (result >= 97) {
						explanation = 4;
					}
					if (result >= 104) {
						explanation = 5;
					}
					if (result >= 110) {
						explanation = 6;
					}
					if (result >= 115) {
						explanation = 7;
					}
					if (result >= 119) {
						explanation = 8;
					}
					if (result >= 123) {
						explanation = 9;
					}
					if (result >= 126) {
						explanation = 10;
					}
					if (result >= 129) {
						explanation = 11;
					}
					if (result >= 132) {
						explanation = 12;
					}
					if (result >= 134) {
						explanation = 13;
					}
					if (result >= 137) {
						explanation = 14;
					}
					if (result >= 139) {
						explanation = 15;
					}
					if (result >= 141) {
						explanation = 16;
					}
					if (result >= 143) {
						explanation = 17;
					}
					if (result >= 145) {
						explanation = 18;
					}
					if (result >= 147) {
						explanation = 19;
					}
					if (result >= 149) {
						explanation = 20;
					}
					if (result >= 150) {
						explanation = 21;
					}
					if (result >= 152) {
						explanation = 22;
					}
					if (result >= 153) {
						explanation = 23;
					}
					if (result >= 155) {
						explanation = 24;
					}
					if (result >= 156) {
						explanation = 25;
					}
					if (result >= 158) {
						explanation = 26;
					}
					if (result >= 159) {
						explanation = 27;
					}
					if (result >= 160) {
						explanation = 28;
					}
					if (result >= 162) {
						explanation = 29;
					}
					if (result >= 163) {
						explanation = 30;
					}
					if (result >= 174) {
						explanation = 40;
					}
					if (result >= 183) {
						explanation = 50;
					}
					if (result >= 191) {
						explanation = 60;
					}
					if (result >= 200) {
						explanation = 70;
					}
					if (result >= 208) {
						explanation = 80;
					}
					if (result >= 219) {
						explanation = 90;
					}
					if (result >= 285) {
						explanation = 99;
					}
					
					var resultlevel;
					if (explanation <= 2) resultlevel=0;
					else if (explanation <= 10) resultlevel=1;
					else if (explanation <= 20) resultlevel=2;
					else resultlevel=3;

					return {
						result: roundNum(result, 0),
						explanation: "Θνησιμότητα εντός εξαμήνου: " + explanation + "%",
						resultlevel: resultlevel
					};
				}
			},
			hasbled: {
				id: "hasbled",
				name: "HAS-BLED Score",
				type: "basic",
				template: "calculator.basic",
				fields: [{
					id: "hypertension",
					name: "Υπέρταση",
					description: "Σ.Π.>160mmHg",
					value: false,
					input: {
						type: "check"
					}
				}, {
					id: "renalfailure",
					name: "Νεφρική Νόσος",
					description: "Τ.Ν. ή Creatinine>2.6mg/dL",
					value: false,
					input: {
						type: "check"
					}
				}, {
					id: "hepaticfailure",
					name: "Ηπατική Νόσος",
					description: "Κίρρωση, Χολερυθρίνη>2xΦυσιολογικό, Τρανσαμινάσες>3xΦυσιολογικό",
					value: false,
					input: {
						type: "check"
					}
				}, {
					id: "stroke",
					name: "Ιστορικό ΑΕΕ",
					value: false,
					input: {
						type: "check"
					}
				}, {
					id: "history",
					name: "Αιμορραγική διάθεση",
					value: false,
					input: {
						type: "check"
					}
				}, {
					id: "inr",
					name: "Δύσκολα ρυθμιζόμενο INR",
					value: false,
					input: {
						type: "check"
					}
				}, {
					id: "age",
					name: "Ηλικία>65",
					value: false,
					input: {
						type: "check"
					}
				}, {
					id: "drugs",
					name: "Φάρμακα",
					description: "Αντιαιμοπεταλιακά, ΜΣΑΦ",
					value: false,
					input: {
						type: "check"
					}
				}, {
					id: "alcohol",
					name: "Ιστορικό χρήσης Αλκοόλ",
					value: false,
					input: {
						type: "check"
					}
				}],
				calc: function(newValue, oldValue, scope) {
					var result;
					var explanation;
					var resultlevel;

					result = _(newValue).reduce(function(memo, value) {
						return memo + val(value.id, newValue);
					}, 0);

					switch (result) {
						case 0:
							explanation = "Ο κίνδυνος είναι 0.9%";
							resultlevel = 0;
							break;
						case 1:
							explanation = "Ο κίνδυνος είναι 3.4%";
							resultlevel = 0;
							break;
						case 2:
							explanation = "Ο κίνδυνος είναι 4.1%";
							resultlevel = 1;
							break;
						case 3:
							explanation = "Ο κίνδυνος είναι 5.8%";
							resultlevel = 1;
							break;
						case 4:
							explanation = "Ο κίνδυνος είναι 8.9%";
							resultlevel = 2;
							break;
						case 5:
							explanation = "Ο κίνδυνος είναι 9.1%";
							resultlevel = 2;
							break;
						default:
							explanation = "Δεν έχει υπολογισθεί ο κίνδυνος";
							resultlevel = 3;
							break;
					}

					return {
						result: "Score: " + result,
						explanation: explanation,
						resultlevel: resultlevel
					};
				}
			},
			killip: {
				id: "killip",
				name: "Killip Class",
				type: "basic",
				template: "calculator.basic",
				fields: [{
					id: "killip",
					name: "Killip Class",
					value: "I",
					input: {
						type: "select",
						options: [{
							value: "I",
							name: "I",
							description: "Απουσία κλινικών σημείων καρδιακής ανεπάρκειας"
						}, {
							value: "II",
							name: "II",
							description: "Υγροί πνευμονικοί ήχοι, Τρίτος τόνος, Αυξημένη Πίεση Σφαγιτιδικής Φλέβας"
						}, {
							value: "III",
							name: "III",
							description: "Οξύ Πνευμονικό Οίδημα"
						}, {
							value: "IV",
							name: "IV",
							description: "Καρδιογενές Σόκ ή Υπόταση (ΑΠ<90mmHg) και σημεία περιφερικού αγγειόσπασμου (Ολιγουρία, Κυάνωση ή Εφύδρωση)"
						}]
					}
				}],
				calc: function(newValue, oldValue, scope) {
					var result  = val("killip", newValue);
					var explanation;
					var resultlevel;
					switch (result) {
						case 'I':
							explanation = "6%";
							resultlevel = 0;
							break;
						case 'II':
							explanation = "17%";
							resultlevel = 1;
							break;
						case 'III':
							explanation = "38%";
							resultlevel = 2;
							break;
						case 'IV':
							explanation = "67%";
							resultlevel = 3;
							break;
					}
					return {
						result: "Killip Class " + result,
						explanation: "Ποσοστό Θνησιμότητας σε 30 Ημέρες: " + explanation,
						resultlevel: resultlevel
					};
				}
			},
			nyha: {
				id: "nyha",
				name: "NYHA Class",
				type: "basic",
				template: "calculator.basic",
				fields: [{
					id: "nyha",
					name: "NYHA type",
					value: "I",
					input: {
						type: "select",
						options: [{
							value: "I",
							name: "I",
							description: "Απουσία συμπτωμάτων και κανένας περιορισμός στην φυσιολογική φυσική δραστηριότητα"
						}, {
							value: "II",
							name: "II",
							description: "Ήπια συμπτώματα και μικρός περιορισμός κατά την φυσιολογική δραστηριότητα"
						}, {
							value: "III",
							name: "III",
							description: "Σημαντικός περιορισμός δραστηριότητας λόγω συμπτωμάτων, ακόμα και σε μικρότερη από φυσιολογική δραστηριότητα. Απουσία συμπτωμάτων κατά την ανάπαυση"
						}, {
							value: "IV",
							name: "IV",
							description: "Έντονος περιορισμός δραστηριότητας λόγω συμπτωμάτων. Παρουσία συμπτωμάτων κατά την ανάπαυση"
						}]
					}
				}],
				calc: function(newValue, oldValue, scope) {
					var result = val("nyha", newValue);
					var nyha = fieldFromId("nyha", newValue);
					var explanation = fieldFromAnyValue(result, "value", nyha.input.options).description;
					var resultlevel;
					if (result=="IV") resultlevel = 3;
					if (result=="III") resultlevel = 2;
					if (result=="II") resultlevel = 1;
					if (result=="I") resultlevel = 0;
					return {
						result: result,
						explanation: explanation,
						resultlevel: resultlevel
					};
				}
			}
		};
	});
})();