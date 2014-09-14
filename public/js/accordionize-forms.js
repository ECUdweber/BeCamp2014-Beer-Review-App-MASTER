function accordionize() {       
    setTimeout(makeAccordion, 500);
}

function hideAllAccordions(selector) {
  $(selector).hide();
}

function showPaneLabels(selector,toggle_selector,toggle_selector2) {
    $(selector).show();
    
    // Toggle the "pane" open/close on click
    $(selector).click(function() {
        var parent = $(this).parent();
        hideAllAccordions();    
        
        parent.children(toggle_selector).toggle();        
        // Now close subpanes
        parent.find('sf-decorator > fieldset > sf-decorator').toggle();        
        
        if(toggle_selector2) {          
          parent.children(toggle_selector2).css("display","block");
        }
    });       
}

function makeAccordion() {
    // Hide all the "subpanes"
    hideAllAccordions('#four_a_form > bootstrap-decorator > fieldset > sf-decorator > fieldset > sf-decorator');
    hideAllAccordions('#four_a_form > bootstrap-decorator > fieldset > sf-decorator > div > ul');
    hideAllAccordions('#four_a_form > bootstrap-decorator > fieldset > sf-decorator > div > ol');
    hideAllAccordions('#four_a_form > bootstrap-decorator > fieldset > sf-decorator > div > div');
    hideAllAccordions('#four_a_form > bootstrap-decorator > fieldset > sf-decorator > div > select');
    
    // Display all the "subpane" labels
    showPaneLabels('#four_a_form > bootstrap-decorator > fieldset > sf-decorator > fieldset > legend','sf-decorator');
    showPaneLabels('#four_a_form > bootstrap-decorator > fieldset > sf-decorator > div > h3', 'ul');
    showPaneLabels('#four_a_form > bootstrap-decorator > fieldset > sf-decorator > div > h3', 'ol', 'div');  //Lawsuits
    showPaneLabels('#four_a_form > bootstrap-decorator > fieldset > sf-decorator > div > label', 'select');
    
    
    
    // Veris form panes
    hideAllAccordions('#veris_form > bootstrap-decorator > fieldset > sf-decorator');
    showPaneLabels('#veris_form > bootstrap-decorator > fieldset > legend', 'bootstrap-decorator > fieldset > sf-decorator');
    
    hideAllAccordions('#veris_form > bootstrap-decorator > div > ul');
    hideAllAccordions('#veris_form > bootstrap-decorator > div > ol');
    hideAllAccordions('#veris_form > bootstrap-decorator > div > div');
    hideAllAccordions('#veris_form > bootstrap-decorator > div > ol > div');
    
    showPaneLabels('#veris_form > bootstrap-decorator > div > h3', 'ul');
    showPaneLabels('#veris_form > bootstrap-decorator > div > h3', 'ol');
    showPaneLabels('#veris_form > bootstrap-decorator > div > h3', 'div');
    
    $('#veris_form > bootstrap-decorator > fieldset > sf-decorator > fieldset > legend').click(function() {
      // Handles subpanes.
      var accordion_section_parent = $(this).parent(); 
      accordion_section_parent.parent().find('fieldset > sf-decorator').toggle();
    });               
}