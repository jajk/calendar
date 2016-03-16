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
		//从form中获得年
	    var _year = parseInt( _selectYearDomObj.options[_selectYearDomObj.selectedIndex].text );
		//从form中获得月
		var _month = _selectMonthDomObj.selectedIndex + 1;
		
		var _today = new Date();
		//得到这月的第一天是星期几(0-6)
		var _firstDay = this.getFirstDay(_year,_month);
		//得到这月有多少天
		var _sumDay = this.getDaysInMonth(_year,_month);
		//画天数的临时变量
		var _dayTemp = 1;
		//画天数时是否画完的变量：true画完,false没画完,初始值为false
		var _sign = false;
		//在tbody画天数时,存储新增行的临时变量
		var _newRow;
		//在tbody画天数时,存储新增行的新增列的临时变量
		var _newCell;
		var _count;
		_calFirstRowObj.innerHTML = _year + "年 " + _month + "月";
		//删除tbody中所有的天数,便于根据上面的年月重绘天数
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
					    _newCell.id = "today";	
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
				//润年
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
		//getFullYear,四位年1970到...
		var _year = _today.getFullYear();
		//获取年select
		var _yearChooser = document.getElementById("calendar_year");
		//获取月select
		var _monthChooser = document.getElementById("calendar_month");
		//重置年select
		_yearChooser.options.length = 0;
		for(var i = _year; i < _year+5; i++){
		//手动添加select选项
		_yearChooser.options[_yearChooser.options.length] = new Option(i,i);//text,value
		}
		//将年月置为此时此刻的年月
		_yearChooser.selectedIndex = 0;
		_yearChooser.onchange = function(){
			_that.improveCalendar();
		};
		_monthChooser.selectedIndex = _today.getMonth();
		_monthChooser.onchange = function(){
			_that.improveCalendar();
		}; 
		this.improveCalendar();
		_yearChooser = null;
		_monthChooser = null;
	}
}   