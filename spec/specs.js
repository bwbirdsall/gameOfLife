beforeEach(function() {
  Cell.all = [];
});

describe('Cell', function() {
  describe('create', function() {
    it('creates a randomly alive or dead cell', function() {
      var testCell = Cell.create(0,0);
      testCell.currentState.should.match(/alive|dedd/);
      testCell.x.should.equal(0);
      testCell.y.should.equal(0);
    });
  });
  describe('switchState', function() {
    it('switches a cell to its future state', function() {
      var testCell = Cell.create(0,0);
      testCell.futureState = "dedd";
      testCell.switchState();
      testCell.currentState.should.equal("dedd");
    });
    it("empties the cell's future state after the switch", function() {
      var testCell = Cell.create(0,0);
      testCell.futureState = "dedd";
      testCell.switchState();
      testCell.futureState.should.equal("");
    });
  });
  describe('find', function() {
    it('returns the cell at a given coordinate', function() {
      var testCell = Cell.create(0,0);
      Cell.find(0,0).should.eql(testCell);
    });
  });
  describe('divination', function() {
    it('sets a dead futureState for a cell with all alive neighbors', function() {
      var testCreation = Creation.create(3);
      Cell.all.forEach(function(cell){
        cell.currentState = "alive";
      });
      var testCell = Cell.find(1,1);
      testCell.divination();
      testCell.futureState.should.equal('dedd');

    });
    it('sets an alive futureState for an alive cell with two alive neighbors', function() {
      var testCreation = Creation.create(3);
      var testCell = Cell.find(1,1);
      for(var y = 0; y < 3; y++) {
        Cell.find(0,y).currentState = "dedd";
        Cell.find(1,y).currentState = "alive";
        Cell.find(2,y).currentState = "dedd";
      }
      testCell.divination();
      testCell.futureState.should.equal('alive');

    });
  });
});

describe('Creation', function() {
  describe('create', function() {
    it('creates a square Creation of cells of the specified dimensions', function() {
      var testCreation = Creation.create(3);
      Cell.all.length.should.equal(9);
    });
  });
  describe('switchAroo', function() {
    it('switches the currentStates of all cells to their futureStates', function() {
      var testCreation = Creation.create(3);
      Cell.all.forEach(function(cell){
        cell.currentState = "alive";
      });
      var testCell = Cell.find(1,1);
      testCreation.switchAroo();
      testCell.currentState.should.equal('dedd');
    });
    it('switches the futureStates of all cells to an empty string', function() {
      var testCreation = Creation.create(3);
      Cell.all.forEach(function(cell){
        cell.currentState = "alive";
      });
      var testCell = Cell.find(1,1);
      testCreation.switchAroo();
      testCell.futureState.should.equal('');
    });
  });
});
