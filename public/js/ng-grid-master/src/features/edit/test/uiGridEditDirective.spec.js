describe('uiGridEditDirective', function () {
  var gridUtil;
  var scope;
  var element;
  var cellTextEditorHtml = '<div><input ng-model="COL_FIELD" ui-grid-text-editor/></div>';
  var cellBooleanEditorHtml = '<div><input type= "checkbox" ng-model="COL_FIELD" ui-grid-text-editor/></div>';
  var cellNumberEditorHtml = '<div><form name="numberForm"><input type="number" ui-grid-text-editor ' +
                             'ng-model="COL_FIELD" /></form></div>';
  var colDefEditableCellTemplate = '<div><input ng-model="COL_FIELD"/></div>';
  var gridOptionsEditableCellTemplate = '<div><input ng-model="COL_FIELD"/></div>';
  var recompile;

  beforeEach(module('ui.grid.edit'));

  beforeEach(inject(function ($rootScope, $compile, $controller, _gridUtil_, $templateCache, $timeout) {
    gridUtil = _gridUtil_;

    $templateCache.put('ui-grid/ui-grid', '<div/>');
    $templateCache.put('ui-grid/uiGridCell', '<div/>');
    $templateCache.put('ui-grid/uiGridHeaderCell', '<div/>');
    $templateCache.put('ui-grid/cellTextEditor', cellTextEditorHtml);
    $templateCache.put('ui-grid/cellBooleanEditor', cellBooleanEditorHtml);
    $templateCache.put('ui-grid/cellNumberEditor', cellNumberEditorHtml);

    scope = $rootScope.$new();
    scope.options = {};
    scope.options.data = [
      {col1: 'row1'},
      {col1: 'row2'}
    ];

    scope.options.columnDefs = [
      {field: 'col1', enableCellEdit: true},
      {field: 'col2', enableCellEdit: false},
      {field: 'col3', enableCellEdit: true, type: 'boolean'},
      {field: 'col4', enableCellEdit: true, type: 'number'}
    ];

    recompile = function () {
      $compile(element)(scope);
      $rootScope.$digest();
    };
  }));

  describe('columnsBuilder function', function () {

    it('should create additional edit properties', function () {
      element = angular.element('<div ui-grid="options" ui-grid-edit />');
      recompile();

      //grid scope is a child of the scope used to compile the element.
      // this is the only way I could figure out how to access
      var gridScope = element.scope().$$childTail;

      var col = gridScope.grid.getColumn('col1');
      expect(col).not.toBeNull();
      expect(col.colDef.enableCellEdit).toBe(true);
      expect(col.editableCellTemplate).toBe(cellTextEditorHtml);

      col = gridScope.grid.getColumn('col2');
      expect(col).not.toBeNull();
      expect(col.colDef.enableCellEdit).toBe(false);
      expect(col.colDef.editableCellTemplate).not.toBeDefined();

      col = gridScope.grid.getColumn('col3');
      expect(col).not.toBeNull();
      expect(col.colDef.enableCellEdit).toBe(true);
      expect(col.editableCellTemplate).toBe(cellBooleanEditorHtml);

      col = gridScope.grid.getColumn('col4');
      expect(col).not.toBeNull();
      expect(col.colDef.enableCellEdit).toBe(true);
      expect(col.editableCellTemplate).toBe(cellNumberEditorHtml);
    });

    it('editableCellTemplate value should get priority over default templates', function () {

      element = angular.element('<div ui-grid="options" ui-grid-edit />');
      scope.options.editableCellTemplate = gridOptionsEditableCellTemplate;
      recompile();

      //A template specified in Grid Options should get priority over defaults
      var gridScope = element.scope().$$childTail;
      var col = gridScope.grid.getColumn('col1');
      expect(col.editableCellTemplate).toBe(gridOptionsEditableCellTemplate);

      //A template specified in colDef should get priority over defaults
      //as well as one specified in grid options
      scope.options.columnDefs[0].editableCellTemplate = colDefEditableCellTemplate;
      recompile();
      expect(col.editableCellTemplate).toBe(colDefEditableCellTemplate);
    });
  });

});