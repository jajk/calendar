function Calendar( elemId ){
	this.elmDomObj = document.getElementById( elemId );
	this.drawCalendar();
	this.initCalendar();
	delete this.elmDomObj;
}
Calendar.prototype = {
	constructor: Calendar,
	drawCalendar: function(){
		var content = '<table id="calendar_table" border="1">'
		                 +'<tr><th id="calendar_firstRow" colspan="7"></th></tr>'
					     +'<tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>'
					     +'<tbody id="calendar_tbody"></tbody>'
					     +'<tr><td colspan="7">'
					         +'<form name="yearMonth">'
					             +'<select id="calendar_year" size="1">'
					             +'</select> 年'
					             +'<select id="calendar_month" size="1">'
					                 +'<option>1<option>2<option>3<option>4'
					                 +'<option>5<option>6<option>7<option>8'
					                 +'<option>9<option>10<option>11<option>12'
					             +'</select>月'
					         +'</form>'
                         +'</td></tr>'
					 +'</table>';
		this.elmDomObj.innerHTML = content;
	},
	improveCalendar: function(){
		var _calFirstRowObj    = document.getElementById("calendar_firstRow");
		var _selectYearDomObj  = document.getElementById('calendar_year');
		var _selectMonthDomObj = document.getElementById('calendar_month');
		var _calTbodyDomObj    = document.getElementById('calendar_tbody');
		//getting the year from '#calendar_year' element
	    var _year = parseInt( _selectYearDomObj.options[_selectYearDomObj.selectedIndex].text );
		//getting the month from '#calendar_month' element
		var _month = _selectMonthDomObj.selectedIndex + 1;
		
		var _today = new Date();
		//getting the first day of the specific month
		var _firstDay = this.getFirstDay(_year,_month);
		//getting the sum days of the specific month
		var _sumDay = this.getDaysInMonth(_year,_month);
		//as temporary variable to remember the increase day
		var _dayTemp = 1;
		//as a sign to judge the action of drawing days;
		//true,stand for the action is over;false,stand for the action is doing 
		var _sign = false;
		//as temporary variable to remain the new row object
		var _newRow;
		//as temporary variable to remain the new cell object
		var _newCell;
		var _count;
		_calFirstRowObj.innerHTML = _year + "年 " + _month + "月";
		//empty the tbody for drawing again
		while( _calTbodyDomObj.rows.length > 0 ){
			_calTbodyDomObj.deleteRow( 0 );
		}//while
		while( !_sign ){
			_newRow = _calTbodyDomObj.insertRow( _calTbodyDomObj.rows.length );
			for( _count = 0; _count < 7; _count++){
				_newCell = _newRow.insertCell( _newRow.cells.length );
				if( _calTbodyDomObj.rows.length == 1 && _count < _firstDay){
					_newCell = "&nbsp";
					continue;
				}//if
				if(_dayTemp == _sumDay){
					_sign = true;
				} 
				if( _dayTemp <= _sumDay ){
					if( _today.getFullYear() == _year && _today.getMonth() == (_month-1) && _today.getDate() == _dayTemp ){
					    _newCell.className = "today";	
					} 
					_newCell.innerHTML = "<a href='#'>"+_dayTemp+"</a>";
					_dayTemp++;
				}
				else{
				    _newCell=innerHTML="&nbsp;";
				}
			}//for
		}//while
		_calFirstRowObj = null;
        _selectYearDomObj = null;
		_selectMonthDomObj = null;
		_calTbodyDomObj = null;
	},
	getFirstDay: function( year, month ){
		var time;
		time=new Date( year, month-1, 1 );
		return time.getDay();
	},
	getDaysInMonth: function( year, month ){
		var days;		
		switch( month ){
			case 1:case 3:case 5:case 7:
			case 8:case 10:case 12:
				days = 31;
			    break;
			case 4:case 6:case 9:case 11:
				days = 30;
			    break;
			case 2:
				//润年(	leap year)
				if (((year% 4)==0) && ((year% 100)!=0) || ((year% 400)==0)){
					days = 29;
				}			 					
				else{
					days = 28;	
				}													
				break;
		}
		return days;		
	},
	initCalendar: function(){
		var _that = this;
		var _today = new Date();
		//getFullYear,begin 1970 to ...
		var _year = _today.getFullYear();
		//getting the select which save the year
		var _yearChooser = document.getElementById("calendar_year");
		//getting the select which save the month
		var _monthChooser = document.getElementById("calendar_month");
		//increase the select of year,form now to (now + 5)
		for(var i = _year; i < _year+5; i++){
		_yearChooser.options[_yearChooser.options.length] = new Option(i,i);//text,value
		}
		//setting the year which is now
		_yearChooser.selectedIndex = 0;
		//when select of the year changed, the calendar will redraw the days
		_yearChooser.onchange = function(){
			_that.improveCalendar();
		};
		//setting the month which is now
		_monthChooser.selectedIndex = _today.getMonth();
		//when select of the month changed, the calendar will redraw the days
		_monthChooser.onchange = function(){
			_that.improveCalendar();
		}; 
		//as first time ,trigger the improveCalendar to draw the days
		this.improveCalendar();
		_yearChooser = null;
		_monthChooser = null;
	}
}   