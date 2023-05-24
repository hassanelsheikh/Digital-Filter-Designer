const allPassPhase = document.getElementById('filteredphaseres');
const final =document.getElementById('finalfilteredphaseres');
const checkList = document.getElementById('apflist');
let p=[];
let z=[];
layout = {
        paper_bgcolor:"#efefef",
        plot_bgcolor:"#efefef",
        autosize: false,
        width:600,
        height:250,

        margin: {
          l: 40,
          r: 0,
          b: 20,
          t: 10,
          pad: 0
        }
}

//initialize
Plotly.newPlot(
    allPassPhase,
    [{x: [], y: []}],layout, { staticPlot: true })
    Plotly.newPlot(
        final,
        [{x: [], y: []}],layout, { staticPlot: true })    

    



function opentab() {
    document.getElementById("myNav").style.height = "90%";
  }
  
  function closetab() {
    document.getElementById("myNav").style.height = "0%";
  }


function opentab() {
    document.getElementById("myNav").style.height = "90%";
  }
  
  function closetab() {
    document.getElementById("myNav").style.height = "0%";
  }


var swiper = new Swiper('.swiper-container', {
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    slidesPerView: 5,
    spaceBetween: 10,
    autoplayDisableOnInteraction: false,
    loop: true,
    breakpoints: {
    1024: {
        slidesPerView: 3,
        spaceBetween: 40
    },
    768: {
        slidesPerView: 3,
        spaceBetween: 30
    },
    640: {
        slidesPerView: 2,
        spaceBetween: 20
    },
    320: {
        slidesPerView: 1,
        spaceBetween: 10
    }
    }
    });

const real=document.querySelector('#real')
const imaginary=document.querySelector('#imaginary')
const list = document.querySelector("#list")



function addItem2(a,n){

    let x,y;

    if(n==1){
        if((real.value=="" || imaginary.value=="" )||(parseFloat(real.value)==0 && parseFloat(imaginary.value)==0) ){
            return}
        else{
         x=real.value;
         y=imaginary.value;}
        }
    if(n==0) {
        x=a[0];
        y=a[1];}    

    // var newA = math.complex(a[0], a[1])    
    const myli = document.createElement('li');
    myli.innerHTML =" a = " + x + " + j " + y ;
    list.appendChild(myli);
    const span = document.createElement('span');
    span.innerHTML = '×';
    myli.appendChild(span);
    
    const close = document.querySelectorAll('span');
    const txt = document.querySelectorAll('li');
    for(let i=0; i<close.length;i++){
        close[i].addEventListener('click',()=>{
            close[i].parentElement.style.opacity = 0;
            let s = txt[i+1].innerHTML;
            let string = s.replace(/[a+=<spn>×</spn> ]/g, '');
            string=string.replace(/[j]/g, ',');
            let k ;
            for(let i =0; i<string.length;i++){
                if(string[i]==','){k=i;
                break;}
            } 
            r = parseFloat(string.substring(0,k));
            im=parseFloat(string.substring(k+1,string.length));
             console.log("r"+r);
             console.log("i"+im);

            let a = getapfzap(r,im);
            let z = getvalues(a[0]);
            let p = getvalues(a[1]);
           deleteA(z,p);//to be done bas ana msh ader
            
            



            setTimeout(()=>{
                close[i].parentElement.style.display = "none";

            },500)

        })
    }
    real.value="";
    imaginary.value = "";
    applyAPF([x,y]);
}

async function updateFilterPhase(allPassCoeff){
    const { zeros, poles } = filter_plane.getZerosPoles(radius)
    const { angels: allPassAngels } = await postData(
        'http://127.0.0.1:8000//getAllPassFilter',
        {
            zero,
            poles,
            a: allPassCoeff,
        }
    )

    Plotly.newPlot(
        allPassPhase,
        [{x: w, y: allPassAngels}],layout, { staticPlot: true })
    }

    function updateAllPassCoeff(){
        let allPassCoeff = []
        document.querySelectorAll('.target1').forEach(item => {
            let aValue = (item.dataset.avalue)
            console.log(aValue)
            let checked = item.checked
            if (checked) allPassCoeff.push(aValue)
        })
        updateFilterPhase(allPassCoeff)
    }

    function review(){
        const real=parseFloat(document.querySelector('#real').value);
        const imaginary= parseFloat(document.querySelector('#imaginary').value);
        if((document.querySelector('#real').value=="" || document.querySelector('#imaginary').value=="" )||(real ==0 && imaginary==0) ){
          return}
        // if(document.querySelector('#real').value == '' && document.querySelector('#imaginary').value == ''){return}
        flag = 'review'
        console.log(real);
        let apf  =getapfzap(real,imaginary);
        // console.log(apf[0]);
        // console.log(apf[1]);

      
        let polesvalues = [getvalues(apf[1])];
        let zerosvalues = [getvalues(apf[0])];
        // console.log(polesvalues);
        // console.log(zerosvalues);
        let w=[];let y_phase=[];
      
        $.ajax({
          type: 'POST',
          url: 'http://127.0.0.1:5000//digitalFilter',
          data: JSON.stringify({zerosvalues, polesvalues, flag}),
          cache: false,
          dataType: 'json',
          async: false,
          contentType: 'application/json',
          processData: false,
          success: function(data) {
            w = data[0];
            y_phase = data[1];
            
          },
      });
      
      Plotly.newPlot(
        allPassPhase,
        [{ x: w, y: y_phase, line: { color: 'red' } }, ],
        layout,
       { staticPlot: true })
      
      
      }
      
      function getapfzap(r,i){
        let sq= r*r + i*i;
        let p =denormalize(r,i);
        let zreal = r / sq ;
        let zimj =  i / sq ;
        let z=denormalize(zreal,zimj);
        let zarr=[z[0],z[1]];
        let parr=[p[0],p[1]];
        return [zarr , parr];
        
      }

      function denormalize(a,b) {
        return [(150 + 100 * a), ( 150 - 100 * b)]
      }

      function getvalues(element) {
        return ([((element[0] - 150) / 100), (( 150-element[1]) / 100)])
      }


      function applyAPF(a){

        // let sq= a[0]*a[0]+a[1]*a[1];
        // p.push([(a[0]*100 + 150),(150 - a[1]*100)]);
        // let real = a[0] / sq ;
        // let imj =  a[1] / sq ;
        // z.push([(real*100 + 150),(150 - imj*100)]);
        let apf  =getapfzap(a[0],a[1]);
        // console.log(apf[0]);
        // console.log(apf[1]);

      
        let p = [getvalues(apf[1])];
        let z = [getvalues(apf[0])];


        let w=[];let y_phase=[];

        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:5000//getphase_correctors',
            data: JSON.stringify({z, p}),
            cache: false,
            dataType: 'json',
            async: false,
            contentType: 'application/json',
            processData: false,
            success: function(data) {
              w = data[0];
              y_phase = data[1];
              
            },
        });
        console.log(w)
        Plotly.newPlot(
            final,
            [{ x: w, y: y_phase, line: { color: 'red' } }, ],
            layout,
           { staticPlot: true })
      }


function deleteA(a1,a2){

}      