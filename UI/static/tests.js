'use-strict';


it('should initialise HTML', function(){
    const form = document.createElement('form');
    const input = document.createElement('input')
    input.id = "eml"
    form.id="frm"
    let main = new main()
    main.DomManipulation()
    form.appendChild(input);
    expect(Dom.init().form).toEqual(form)
  })