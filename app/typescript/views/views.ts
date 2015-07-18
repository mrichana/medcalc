module CalculatorViews {
  'use strict';

  export class viewsCollection {
    private static _allList: View[] = [];
    private static _categories: any = {};
    private static _all: any = {};

    static add(viewList: View[]): void {
      viewsCollection._allList = _.union(viewsCollection._allList, viewList);
      viewsCollection._all = _.indexBy(viewsCollection._allList, 'id');
      _.each(viewsCollection._allList, function(view) {
        _.each(view.fields, function(field) {
          if (field.calculator && viewsCollection._all[field.calculator]) {
            field.calculatorView = angular.copy(viewsCollection._all[field.calculator]);
            field.calculatorView.parent = view;
          }
        });
      });
      viewsCollection._categories = _.reduce(viewsCollection._allList, function(memo, view: IView) {
        var categories = view.category ? view.category.split(/\W+/g) : ['generic'];
        _.each(categories, function(category) {
          memo[category] = memo[category] || {};
          memo[category][view.id] = view;
        });
        return memo;
      }, {});
    };

    static all() {
      return viewsCollection._all;
    };

    static allList() {
      return viewsCollection._allList;
    };

    static categories() {
      return viewsCollection._categories;
    }
  }

  export interface IView {
    id: string;
    name: string;
    category: string;
    template: string;
    defaultValues: any;
    fields: IField[];

    values: any;

    init(): void;
    reset(): void;
    update(newValue: any, oldValue: any, scope: ng.IScope, field: IField): any;
    validate(newValue: any, oldValue: any, scope: ng.IScope, field: IField): void;

    calculator(values: any): Result;
  }

  export class Result {
    result: any;
    explanation: string;
    resultlevel: number;

    prefix: string = '';
    suffix: string = '';

    formula: string;
  }

  export class View implements IView {
    id;
    name;
    category;
    template;
    defaultValues;
    fields;

    values;

    constructor() {
    }

    init() {
      /*if (!this.parent) {
        this.values = this.values || {};
      } else {
        this.values = this.parent.values;
      };*/
      _.defaults(this.values, this.defaultValues);
    }

    reset() {
      _.extend(this.values, this.defaultValues);
    }

    update(newValue: any, oldValue: any, scope: ng.IScope, field: IField) {
      this.validate(newValue, oldValue, scope, field);
      var result = this.calculator(this.values);
      this.values[this.id] = result.result;
      return result;
    }

    validate(newValue: any, oldValue: any, scope: ng.IScope, field: IField) {
    }

    static roundNum(thisNum: number, dec?: number): number {
      dec = dec || 0;
      thisNum = thisNum * Math.pow(10, dec);
      thisNum = Math.round(thisNum);
      thisNum = thisNum / Math.pow(10, dec);
      return thisNum;
    };

    static evaluator(scope, formula) {
      return math.compile(formula).eval(scope);
    }

    calculator(values) {
      return new Result();
    }
  }

  interface IFieldInput {
    type: string;
  }

  export interface IField {
    id: string;
    name?: string;
    input: IFieldInput;
  }

  export class GeneralField implements IField {
    id: string;
    name: string;
    input: IFieldInput;
    constructor(id: string, name: string, input: IFieldInput) {
      this.id = id;
      this.name = name;
      this.input = input;
    }
  }

  export var ageField = new GeneralField('Age', 'Ηλικία', { type: 'number', step: 1, min: 1, max: 120 });
  export var sexField = new GeneralField('Sex', 'Φύλο', { type: 'select', options: [{ value: 0, name: '♂ Άρρεν' }, { value: 1, name: '♀ Θήλυ' }] });
  export var heightField = new GeneralField('Height', 'Ύψος (cm)', { type: 'number', step: 1, min: 0, max: 250 });
  export var weightField = new GeneralField('Weight', 'Βάρος (kgr)', { type: 'number', step: 1, min: 0, max: 250 });
  export var bloodPressure_SystolicField = new GeneralField('BloodPressure_Systolic', 'Συστολική Αρτηριακή Πίεση', { type: 'number', step: 5, min: 50, max: 280 });
  export var resultField = new GeneralField('result', '', { type: 'result' });
}
