var Cell = {
  all: [],
  create: function(x, y) {
    var newCell = Object.create(Cell);
    newCell.x = parseInt(x);
    newCell.y = parseInt(y);
    if(Math.round(Math.random()) === 1) {
      newCell.currentState = "alive";
    } else {
      newCell.currentState = "dedd";
    }
    newCell.futureState = "";
    Cell.all.push(newCell);
    return newCell;
  },
  divination: function() {
    var aliveNeighbors = 0;
    var divCounter = 0;
    for(var neighborX = this.x - 1; neighborX < this.x + 2; neighborX++) {
      for(var neighborY = this.y - 1; neighborY < this.y + 2; neighborY++) {
        divCounter ++;
        var neighbor = Cell.find(neighborX,neighborY);
        if(neighborX === this.x && neighborY === this.y) {
        } else if(neighborX < 0 || neighborY < 0) {
        } else if(neighbor.currentState === "alive") {
          aliveNeighbors++;
        }
        /*console.log("divCounter: " + divCounter);
        console.log("this.x and this.y " + this.x + ", " + this.y);
        console.log("Neighbor: " + neighborX + ", " + neighborY);
        console.log("aliveNeighbors: " + aliveNeighbors);
        debugger;*/
      }
    }
    divCounter = 0;

    if (aliveNeighbors === 3) {
      this.futureState = "alive";
    } else if (aliveNeighbors === 2 && this.currentState === "alive") {
      this.futureState = "alive";
    } else {
      this.futureState = "dedd";
    }
  },
  find: function(x, y) {
    var match = false;
    Cell.all.forEach(function(cell) {
      if(cell.x === x) {
        if(cell.y === y) {
          match = cell;
        }
      }
    });
    return match;
  },
  switchState: function() {
  if (this.futureState === "") {
      alert("You fucked up. Can't switch to a non-existent futureState");
    } else {
      this.currentState = this.futureState;
      this.futureState = "";
    }
  }
}

var Creation = {
  create: function(dimension) {    
    var newCreation = Object.create(Creation);
    for(var y = 0; y < dimension; y++) {
      for(var x = 0; x < dimension; x++) {
        Cell.create(x,y);
      }
    }
    return newCreation;
  },
  switchAroo: function() {
    Cell.all.forEach(function(cell) {
      cell.divination();
    });
    debugger;
    Cell.all.forEach(function(cell) {
      cell.switchState();
    });
  }
}

$(document).ready(function() {
  $("form#start-game").submit(function(event) {
    event.preventDefault();

    var firmamentSize = $("input#new-creation-number").val();
    if(isNaN(firmamentSize)) {
      alert('You fool! Creation needs a size, not that jibberjabber!');
    } else if (firmamentSize > 17) {
      alert('Just kidding! Pick a smaller number, please and thank you.');
    } else {
      $("#creation-entry").hide();
      $("#creation-form").show();
      $("#recreation-form").show();
      var newCreation = Creation.create(firmamentSize);
      $("#creation-display").text("");

      for(var y = 0; y < firmamentSize; y++) {
        for(var x = 0; x < firmamentSize; x++) {
          var lifeMaybe = Cell.find(x,y);
          if (lifeMaybe.currentState === "alive") {
            $("#creation-display").append("<img src='http://forums.tapastic.com/assets/emoji/octopus.png'>");
          } else {
            $("#creation-display").append("<img src='http://emojisaurus.com/images/emoji/ghost.png'>");  
          }
        }
        $("#creation-display").append("<br/>");
      }
    }
    $("form#creation-form").submit(function(event) { 
      event.preventDefault();

      newCreation.switchAroo();

      $("#creation-display").text("");

      for(var y = 0; y < firmamentSize; y++) {
        for(var x = 0; x < firmamentSize; x++) {
          var lifeMaybe = Cell.find(x,y);
          if (lifeMaybe.currentState === "alive") {
            $("#creation-display").append("<img src='http://forums.tapastic.com/assets/emoji/octopus.png'>");
          } else {
            $("#creation-display").append("<img src='http://emojisaurus.com/images/emoji/ghost.png'>");  
          }
        }
        $("#creation-display").append("<br/>");
      }

      this.reset();


    });
  });
});
