//play
var ans="";
var result="";

//-----------------------------------------------------------------------------------

//compute
//var first=0; // 首次電腦猜題
var com_result="";  //玩家回答電腦幾B幾B
var AI_ans="3210"; //電腦給的答案
var AI_count=0;  //電腦猜的次數

//排除法
var save_input_data =[];  //存0-9 幾A幾B差異
var save_input_data_three=[]; //存前三碼庫

var com_ansarray=[3,4,5,6,7,8,9,1,2,3];
var mabyanser=[];
var noanser=[];


//0A4B解法
var save_record_guess_database=[];  // 儲存已經猜過的數字
var save_record_guess1=[];  // 有四個答案但是位置不完全對
var save_record_guess2=[];  // 第一個猜對的四個值 做之後參考用
var rangg=0;
var fir_Four=0;



var flash="";
var merge=0;
var checkOK=1;
var checkOKK=0;



//----------------------------------------------------------------------------------------
//玩家猜題按鈕
function guess_ans() {
	//a += Math.floor(Math.random()*9999+1)+"\u00a0";
	ans="";
	var ansarray=[0,1,2,3,4,5,6,7,8,9];
	
	for(var k=0; k<4; k++)
	{
		var ran = Math.floor(Math.random()*(9-k));
		ans+=ansarray[ran];
		ansarray.splice(ran,1);	
	}	
	document.getElementById("play_ans_show").innerHTML ="<BR><span style=\'color:#ff0000\'>"+"遊戲開始<BR>題目產生完畢!請猜題。"+ans+"</span>";
	//重新產生題目要刪掉歷史對話
	document.getElementById("play_geuss_result").innerHTML ="<BR><span style=\'color:#ff0000\'>"+"</span>";
	result="";
}

//輸入錯誤的規則  4碼加不重複
function ruls(value){
	var true_false=false;

	if(value.length<4)  true_false=true;
	else if((value.charAt(0)==value.charAt(1))||(value.charAt(0)==value.charAt(2))||(value.charAt(0)==value.charAt(3))) true_false=true;
	else if((value.charAt(1)==value.charAt(0))||(value.charAt(1)==value.charAt(2))||(value.charAt(1)==value.charAt(3))) true_false=true;
	else if((value.charAt(2)==value.charAt(0))||(value.charAt(2)==value.charAt(1))||(value.charAt(2)==value.charAt(3))) true_false=true;
	else if((value.charAt(3)==value.charAt(0))||(value.charAt(3)==value.charAt(1))||(value.charAt(3)==value.charAt(2))) true_false=true;
	
	return true_false;	
}

//玩家猜題
function play_geuss()
{
	var test=1;
	var receive_ans = document.getElementById("playinput").value;
	var a=0,b=0;
		
		if(ruls(receive_ans)==true)
		{
			result+="請輸入四個不重複數字<BR>";
		}
		else if(receive_ans==ans)
			result+="恭喜你猜對了<BR>";
		else
		{
			for(var c=0; c<=3; c++)
			{
				if(receive_ans.charAt(c)==ans.charAt(c))
				a++;
				if(receive_ans.charAt(0)==ans.charAt(c) || receive_ans.charAt(1)==ans.charAt(c) || receive_ans.charAt(2)==ans.charAt(c) ||receive_ans.charAt(3)==ans.charAt(c))
				b++;
			}
			b=b-a;
			result+="你猜的數字:"+receive_ans+"------>  "+a+"A"+b+"B"+"<BR>";
		}
	
		document.getElementById("play_geuss_result").innerHTML ="<BR><span style=\'color:#ff0000\'>"+result+"</span>";
}
//----------------------------------------------------------------------------------------
//電腦猜題按鈕 = 重置或開始
function com_value() {
	AI_ans="3210"
	AI_count=0;
	
	fir_Four=0;
	
	save_record_guess1=[];
	save_record_guess_database=[];
	mabyanser=[];
	noanser=[];
	
	save_record_guess2=[];
	
	document.getElementById("com_geuss").innerHTML =AI_ans;
	com_result="遊戲開始!<BR>"
	document.getElementById("com_geuss_result").innerHTML ="<BR><span style=\'color:#ff0000\'>"+com_result+"</span>";
	
	save_input_data_three=[];
	save_input_data =[];   
	com_ansarray=[3,4,5,6,7,8,9,1,2,3];
}

//答題按鈕
function com_response(){
	var A = document.getElementById("XA_input").value;
	var B = document.getElementById("XB_input").value;
		

		//沒先電腦猜題空值就自動幫
		if(document.getElementById("com_geuss").innerHTML=="_ _ _ _")
			com_result+="請先讓電腦猜，再答題。<BR>"
		//A、B 不等於0~4 值都錯
		else if(!(A==0 || A==1 || A==2 || A==3 || A==4)||!(B==0 ||B==1 || B==2 || B==3 || B==4))
			com_result+="請輸入0~4的數字<BR>";
		//A、B 空值都錯
		else if(A==""||B=="")
			com_result+="請輸入0~4的數字<BR>";
		//A、B 總和大於4也錯
		else if((parseInt(A)+parseInt(B))>4)
			com_result+="輸入的值總和大於4!!<BR>";
		//比對A、B與電腦猜值結果
		else
			comAI();	
		
		document.getElementById("com_geuss_result").innerHTML ="<BR><span style=\'color:#ff0000\'>"+com_result+"</span>";
}

//AI答題解讀
function comAI(){
	var A=document.getElementById("XA_input").value;
	var B=document.getElementById("XB_input").value;
	var C=document.getElementById("com_geuss").innerHTML;  //取電腦目前猜的
	
	//4A破關!
	if(A==4)
	{
		AI_count=parseInt(AI_count)+1;
		com_result+="["+AI_count+"]電腦猜 "+C+" > 答對了，太棒了!<BR>";
		document.getElementById("com_geuss_result").innerHTML ="<BR><span style=\'color:#ff0000\'>"+com_result+"</span>";
	}
	//數字AI判斷
	else 
	{	
		//首次
		if(AI_count==0){	
			com_result+="["+AI_count+"]電腦猜 "+ C +"  >>>  "+A+"A"+B+"B<BR>";
		
			//0A4B處理
			if((parseInt(A)+parseInt(B))==parseInt(4))
			{
				if(fir_Four==0)
				{
					save_record_guess2.push(C.charAt(0), C.charAt(1), C.charAt(2), C.charAt(3));
					fir_Four=1;
				}
				save_record_guess_database.push(C);
				checkOK=1;
				
				checkjk :
				while(checkOK>=1)
				{
					checkOKK=0;
					flash="";
					save_record_guess1.push(save_record_guess2[0],save_record_guess2[1],save_record_guess2[2],save_record_guess2[3]);
					
					for(var p=0; p<4; p++)
					{
						rangg=Math.floor(Math.random()*(4-p));
						flash+=save_record_guess1[rangg]+"";
						save_record_guess1.splice(rangg,1);
						
					}
					for(var jj=0; jj<save_record_guess_database.length;jj++)
					{
						if(parseInt(flash)==parseInt(save_record_guess_database[jj]))
						{
							continue checkjk;
							//checkOKK++;
						}
						if(parseInt(checkOKK)==0)
						{
							checkOK=0;
						}
					}
				}
				document.getElementById("com_geuss").innerHTML =flash;
			}
			
		//排除法
		else
		{
			save_input_data.push([C,A,B]); //存第一次結果 [3210 ,?A, ?B ]
			com_ansarray.splice(C.charAt(3),1); // 刪第四個
			document.getElementById("com_geuss").innerHTML =C.charAt(0)+C.charAt(1)+C.charAt(2)+com_ansarray[0];
		}
			AI_count+=1;
		}	
	
		//首次之後
		else if(AI_count!=0){
			com_result+="["+AI_count+"]電腦猜 "+ C +"  >>>  "+A+"A"+B+"B<BR>";
			
			//0A4B處理
			if((parseInt(A)+parseInt(B))==parseInt(4))
			{
				if(fir_Four==0)
				{
					save_record_guess2.push(C.charAt(0), C.charAt(1), C.charAt(2), C.charAt(3));
					fir_Four=1;
					
				}
				
				save_record_guess_database.push(C);
				checkOK=1;
				
				checkj :
				while(checkOK>=1)
				{
					checkOKK=0;
					flash="";
					save_record_guess1.push(save_record_guess2[0],save_record_guess2[1],save_record_guess2[2],save_record_guess2[3]);
										
					for(var p=0; p<4; p++)
					{	
						rangg=Math.floor(Math.random()*(4-p));
						flash+=save_record_guess1[rangg];
						save_record_guess1.splice(rangg,1);
					}
				
					for(var jj=0; jj<save_record_guess_database.length;jj++)
					{
						if(parseInt(flash)==parseInt(save_record_guess_database[jj]))
						{
							continue checkj;
							//checkOKK++;
						}
					}
					if(parseInt(checkOKK)==0)
					{
						checkOK=0;
					}
				}
				
				document.getElementById("com_geuss").innerHTML =flash;
			}
			
			//排除法
			else
			{
				// BUG玩家沒正確輸入XAXB
				if(com_ansarray==-1)
				{
				  alert("你輸入的答題有錯!，請按電腦猜題重新來過");
				}
			
				com_ansarray.splice(0,1);// 刪除陣列第一個
				document.getElementById("com_geuss").innerHTML =C.charAt(0)+C.charAt(1)+C.charAt(2)+com_ansarray[0];
				save_input_data.push([C,A,B]); //存第N次 [3210 ,?A, ?B ]
				
			if(com_ansarray.length==3)
			{	
				merge=4;
				flash="";
				
				for(var j=0; j<save_input_data.length; j++)
				{
					if(parseInt(merge)>=(parseInt(save_input_data[j][1])+parseInt(save_input_data[j][2])))
						merge=parseInt((parseInt(save_input_data[j][1])+parseInt(save_input_data[j][2])))
				}
				for(var j=0; j<save_input_data.length; j++)
				{
					if((parseInt(save_input_data[j][1])+parseInt(save_input_data[j][2]))==merge)
					{
						flash=save_input_data[j][0];
						noanser.push(flash.charAt(3));
					}
					else
					{
						flash=save_input_data[j][0];
						mabyanser.push(flash.charAt(3));
					}
				}	
				document.getElementById("com_geuss").innerHTML =noanser[0]+noanser[1]+noanser[2]+com_ansarray[0];		
			}
			if(com_ansarray==0)
			{
				for(var i=7; i<=9; i++)
				{
					save_input_data_three.push([save_input_data[i][0],save_input_data[i][1],save_input_data[i][2]]);
				}		
				merge=4;
				flash="";	
				
				for(var cc=0; cc<3; cc++)
				{	
					if(merge > parseInt(save_input_data_three[cc][1]) + parseInt(save_input_data_three[cc][2]) )  
						{
							merge=parseInt(save_input_data_three[cc][1]) + parseInt(save_input_data_three[cc][2]) ;
						}
				}	
				for(var cc=0; cc<3; cc++)
				{
					if( (parseInt(save_input_data_three[cc][1]) + parseInt(save_input_data_three[cc][2])) == merge)
					{
						flash=save_input_data_three[cc][0];
						noanser.push(flash.charAt(3));
					}
					else
					{
						flash=save_input_data_three[cc][0];
						mabyanser.push(flash.charAt(3));
					}
				}
				document.getElementById("com_geuss").innerHTML =mabyanser[0]+mabyanser[1]+mabyanser[2]+mabyanser[3];
				com_ansarray=-1; // BUG測試給客戶重整用
				
				// BUG玩家沒正確輸入XAXB
				if(mabyanser.length!=4)
				{
					alert("你輸入的答題有錯!，重新來過");
					com_value();
				}
			}
			}
			AI_count+=1;
		}	
}	
}