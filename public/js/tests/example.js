var app = angular.module("app", ["schemaForm"]);

app.controller("ExampleCtrl", function($scope) {
  $scope.schema =
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "description": "Four A Security Prototype root schema",
  "type": "object",

  "properties": {
    "anyOf": [
      { "$ref": "foura.json" },
      { "$ref": "verisc-merged.json" },
    ]
  }
  required: ["description"]
}

  $scope.fields = ["title", "level", "good"]
  $scope.model = {
    title: "Uncle John's Bathroom Reader",
    good: false
  }
});
