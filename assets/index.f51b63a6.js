import{_ as k,E,r as p,d as H,o as g,c as _,a as o,w as i,e as B,i as F,b as u,t as P,g as h,F as A,h as x,f as S}from"./index.ec5771ba.js";const L={components:{},data(){return{proveedorID:null,presupuestacionID:null,loading:!1,presupuestaciones:[],loading:!1,idProveedor:null,idPresupuestacion:null,arrayInformacionParaCarga:[],datosGenerales:null,datosProductos:[],datosProveedor:null,arrayInformacionParaCarga:[],arrayProductosDesdeAPI:[],loadingDatosProveedor:!1,loadingArrayInformacionParaCarga:!1,totalPP:0,precioFlete:0,facturaA:null,montoIVA:0,disabledEmiteFactura:!0,arrayCondicionesPago:[],condicionpago:null,descuentosyBonificaciones:0,totalHomogeneo:0,loadingBtnGuardar:!1,diaPago:null,diaPagoSinFormatear:null,fechaLimiteCarga:localStorage.getItem("fechaLimiteCarga"),deshabilitarPorFecha:!1,opcionesFacturaA:[{value:"1",label:"Si"},{value:"0",label:"No"}],opcionesIVA:[{value:"21",label:"21"},{value:"10.5",label:"10,5"},{value:"27",label:"27"}]}},mounted(){this.getCondicionesPago(),this.getDatos()},methods:{verDatos(){this.proveedorID=localStorage.getItem("proveedorID"),this.presupuestacionID=localStorage.getItem("presupuestacionID")},limpiarCampos(){this.idProveedor=null,this.idPresupuestacion=null,this.arrayInformacionParaCarga=[],this.datosGenerales=null,this.datosProductos=[],this.datosProveedor=null,this.arrayInformacionParaCarga=[],this.arrayProductosDesdeAPI=[],this.totalPP=0,this.precioFlete=null,this.facturaA=null,this.montoIVA=0,this.disabledEmiteFactura=!0,this.arrayCondicionesPago=[],this.condicionpago=null,this.descuentosyBonificaciones=null,this.totalHomogeneo=null,this.diaPago=null,this.diaPagoSinFormatear=null,this.getCondicionesPago(),this.getDatos()},async getDatos(){this.loadingDatosProveedor=!0,this.loadingArrayInformacionParaCarga=!0,this.proveedorID=localStorage.getItem("proveedorID"),this.idProveedor=localStorage.getItem("proveedorID"),this.presupuestacionID=localStorage.getItem("presupuestacionID"),this.idPresupuestacion=localStorage.getItem("presupuestacionID");let a=new Date,e=new Date(this.fechaLimiteCarga);console.log("fechaActual"),console.log(a),console.log("fechaLimiteCarga"),console.log(e),console.log("comp fecha"),console.log(e>a),e>a?(console.log("mayor fecha carga"),this.deshabilitarPorFecha=!1):(console.log("menor fecha carga"),console.log(this.fechaLimiteCarga),console.log(a),this.deshabilitarPorFecha=!0),await this.axios.get("/api/presupuestacion/obtenerDatos/"+this.presupuestacionID).then(n=>{const d=n;if(d!=null){this.datosGenerales=d.data,this.datosProductos=d.data.productos,console.log("this.datosProductos"),console.log(this.datosProductos);let r=[];r=d.data.proveedores,r.forEach(c=>{if(this.proveedorID==c.proveedor_id){let v={presupuestacion_id:c.presupuestacion_id,presupuestacion_plan_id:c.presupuestacion_plan_id,presupuestacion_proveedor_id:c.presupuestacion_proveedor_id,proveedor_id:c.proveedor_id,proveedor_mail:c.proveedor_mail,proveedor_nombre:c.proveedor_nombre,proveedor_rubro_id:c.proveedor_rubro_id};this.datosProveedor=v}}),this.mostrarInformacionParaCargar()}else this.cerrar()})},async getCondicionesPago(){await this.axios.get("/api/condicionpago/obtenerTodos").then(a=>{const e=a;this.arrayCondicionesPago=e.data})},mostrarInformacionParaCargar(){this.datosProductos.forEach(a=>{let e={presupuestacion_productos_proveedores_id:0,presupuestacion_plan_id:this.datosGenerales.presupuestacion_plan_id,presupuestacion_id:this.datosGenerales.presupuestacion_id,presupuestacion_producto_id:a.productoPresupuestacion.presupuestacion_producto_id,presupuestacion_rubro_id:this.datosGenerales.presupuestacion_rubro_id,presupuestacion_rubro_nombre:this.datosGenerales.presupuestacion_rubro_nombre,proveedor_id:this.datosProveedor.proveedor_id,proveedor_nombre:this.datosProveedor.proveedor_nombre,proveedor_mail:this.datosProveedor.proveedor_mail,producto_id:a.productoPresupuestacion.producto_id,producto_nombre:a.productoPresupuestacion.producto_nombre,producto_unidad:a.producto.producto_unidad,producto_cantidad_a_comprar:a.productoPresupuestacion.producto_cantidad_a_comprar,precio_png:a.productoPresupuestacion.precio_png,factor:1,cantidad_proveedor:a.productoPresupuestacion.producto_cantidad_a_comprar,iva:a.productoPresupuestacion.iva,total_iva:null,precio_pu:a.productoPresupuestacion.precio_pu,precio_pp:a.productoPresupuestacion.precio_pp,observaciones:a.productoPresupuestacion.producto_observaciones,ya_agregado:0};this.arrayInformacionParaCarga.push(e)}),console.log("this.arrayInformacionParaCarga"),console.log(this.arrayInformacionParaCarga),this.completarArrayConProductosAgregados()},async completarArrayConProductosAgregados(){let a={idPresupuestacion:this.idPresupuestacion,idProveedor:this.idProveedor};await this.axios.post("/api/presupuestacionproductosproveedor/obtenerTodosDatos",a).then(e=>{console.log("response.data*********"),console.log(e.data),e.data.productoProveedor.length>0&&(this.arrayProductosDesdeAPI=e.data.productoProveedor,this.precioFlete=e.data.presupuestacionProveedorDB.proveedor_monto_flete,e.data.presupuestacionProveedorDB.proveedor_factura_A==1?this.facturaA="Si":this.facturaA="No",e.data.presupuestacionProveedorDB.proveedor_monto_factura_A==null?this.montoIVA=0:this.montoIVA=e.data.presupuestacionProveedorDB.proveedor_monto_factura_A,this.arrayCondicionesPago.forEach(n=>{n.condicionpago_id==e.data.presupuestacionProveedorDB.proveedor_forma_de_pago&&(this.condicionpago=n.condicionpago_nombre)}),this.descuentosyBonificaciones=e.data.presupuestacionProveedorDB.proveedor_monto_descuentos_bonificaciones,this.totalHomogeneo=e.data.presupuestacionProveedorDB.proveedor_monto_total_homogeneo,this.arrayInformacionParaCarga.forEach(n=>{this.arrayProductosDesdeAPI.forEach(d=>{n.presupuestacion_producto_id==d.presupuestacion_producto_id&&n.proveedor_id==d.proveedor_id&&(n.presupuestacion_productos_proveedores_id=d.presupuestacion_productos_proveedores_id,n.presupuestacion_productos_proveedores_id=d.presupuestacion_productos_proveedores_id,n.presupuestacion_producto_id=d.presupuestacion_producto_id,n.presupuestacion_id=d.presupuestacion_id,n.presupuestacion_plan_id=d.presupuestacion_plan_id,n.presupuestacion_rubro_id=d.presupuestacion_rubro_id,n.presupuestacion_rubro_nombre=d.presupuestacion_rubro_nombre,n.proveedor_id=d.proveedor_id,n.proveedor_nombre=d.proveedor_nombre,n.proveedor_mail=d.proveedor_mail,n.producto_id=d.producto_id,n.producto_nombre=d.producto_nombre,n.producto_cantidad_real_a_comprar=d.producto_cantidad_a_comprar,n.factor=d.factor,n.cantidad_proveedor=d.cantidad_proveedor,n.precio_png=d.precio_png,n.iva=d.iva,n.total_iva=d.total_iva,n.precio_pu=d.precio_pu,n.precio_pp=d.precio_pp,n.ya_agregado=1)})}),this.loadingArrayInformacionParaCarga=!1,this.sumarPP()),this.loadingDatosProveedor=!1,this.loadingArrayInformacionParaCarga=!1})},getSummaries(a){this.$refs.tablaComparativa;const e=[];let n=5;e[n]=0;let d=0;return this.arrayInformacionParaCarga.forEach((r,c)=>{c==0&&(e[c]="Total"),d=Number(e[n])+Number(r.total_iva),e[n]=d.toFixed(2)}),e},cambiarCantidadProveedor(a){this.arrayInformacionParaCarga[a.$index].cantidad_proveedor=this.arrayInformacionParaCarga[a.$index].producto_cantidad_a_comprar*this.arrayInformacionParaCarga[a.$index].factor,this.calcularPrecioPP(a)},calcularPrecioPP(a){if(console.log("Calcular precio"),this.arrayInformacionParaCarga[a.$index].iva!=null&&this.arrayInformacionParaCarga[a.$index].precio_png!=null){let n=parseFloat(this.arrayInformacionParaCarga[a.$index].iva)*.01,d=parseFloat(n*this.arrayInformacionParaCarga[a.$index].precio_png);this.arrayInformacionParaCarga[a.$index].total_iva=d.toFixed(2);let c=(parseFloat(this.arrayInformacionParaCarga[a.$index].precio_png)+d).toFixed(2);this.arrayInformacionParaCarga[a.$index].precio_pu=c,this.arrayInformacionParaCarga[a.$index].precio_pp=this.arrayInformacionParaCarga[a.$index].precio_pu*this.arrayInformacionParaCarga[a.$index].cantidad_proveedor;let v=this.arrayInformacionParaCarga[a.$index].precio_pp;this.arrayInformacionParaCarga[a.$index].precio_pp=v.toFixed(2),this.sumarPP(a),this.calcularMontoIVA(a)}},calcularMontoIVA(a){},sumarPP(a){this.totalPP=0,this.arrayInformacionParaCarga.forEach(n=>{n.precio_pp!=null&&(this.totalPP=this.totalPP+parseFloat(n.precio_pp))});let e=this.totalPP.toFixed(2);this.totalPP=e,this.calcularTotalHomegeno()},cambiarDisabledEmiteFactura(){this.facturaA==0||this.facturaA==="No"?this.disabledEmiteFactura=!1:(this.facturaA==1||this.facturaA=="Si")&&(this.disabledEmiteFactura=!0,this.montoIVA=0,this.calcularTotalHomegeno())},calcularTotalHomegeno(){let a=parseFloat(this.totalPP)+parseFloat(this.precioFlete)+parseFloat(this.descuentosyBonificaciones)+parseFloat(this.montoIVA);a.toLocaleString("de-DE"),this.totalHomogeneo=a.toFixed(2)},cambiaCondicionPago(){let a=null;if(a=new Date,a.setDate(a.getDate()+180),this.condicionpago==39){let e=this.formatearFecha(a.setDate(a.getDate()+180));this.diaPago=e}if(this.condicionpago==26){let e=this.formatearFecha(a.setDate(a.getDate()+30));this.diaPago=e}if(this.condicionpago==25){let e=this.formatearFecha(a.setDate(a.getDate()+60));this.diaPago=e}if(this.condicionpago==30){let e=this.formatearFecha(a.setDate(a.getDate()+45));this.diaPago=e}if(this.condicionpago==17){let e=this.formatearFecha(a.setDate(a.getDate()+10));this.diaPagoSinFormatear=a.setDate(a.getDate()+10),this.diaPago=e}if(this.condicionpago==20){let e=this.formatearFecha(a.setDate(a.getDate()+20));this.diaPagoSinFormatear=a.setDate(a.getDate()+20),this.diaPago=e}if(this.condicionpago==18){let e=this.formatearFecha(a.setDate(a.getDate()+30));this.diaPagoSinFormatear=a.setDate(a.getDate()+30),this.diaPago=e}if(this.condicionpago==34){let e=this.formatearFecha(a.setDate(a.getDate()+75));this.diaPagoSinFormatear=a.setDate(a.getDate()+75),this.diaPago=e}if(this.condicionpago==24){let e=this.formatearFecha(a.setDate(a.getDate()+75));this.diaPagoSinFormatear=a.setDate(a.getDate()+75),this.diaPago=e}if(this.condicionpago==19){let e=this.formatearFecha(a.setDate(a.getDate()+45));this.diaPagoSinFormatear=a.setDate(a.getDate()+75),this.diaPago=e}if(this.condicionpago==22){let e=this.formatearFecha(a.setDate(a.getDate()+30));this.diaPagoSinFormatear=a.setDate(a.getDate()+30),this.diaPago=e}if(this.condicionpago==10){let e=this.formatearFecha(a.setDate(a.getDate()+60));this.diaPagoSinFormatear=a.setDate(a.getDate()+60),this.diaPago=e}if(this.condicionpago==27){let e=this.formatearFecha(a.setDate(a.getDate()+45));this.diaPagoSinFormatear=a.setDate(a.getDate()+45),this.diaPago=e}if(this.condicionpago==16){let e=this.formatearFecha(a.setDate(a.getDate()+60));this.diaPagoSinFormatear=a.setDate(a.getDate()+60),this.diaPago=e}if(this.condicionpago==36){let e=this.formatearFecha(a.setDate(a.getDate()+105));this.diaPagoSinFormatear=a.setDate(a.getDate()+105),this.diaPago=e}if(this.condicionpago==14){let e=this.formatearFecha(a.setDate(a.getDate()+90));this.diaPagoSinFormatear=a.setDate(a.getDate()+90),this.diaPago=e}if(this.condicionpago==28){let e=this.formatearFecha(a.setDate(a.getDate()+60));this.diaPagoSinFormatear=a.setDate(a.getDate()+60),this.diaPago=e}if(this.condicionpago==37){let e=this.formatearFecha(a.setDate(a.getDate()+90));this.diaPagoSinFormatear=a.setDate(a.getDate()+90),this.diaPago=e}if(this.condicionpago==38){let e=this.formatearFecha(a.setDate(a.getDate()+120));this.diaPagoSinFormatear=a.setDate(a.getDate()+120),this.diaPago=e}if(this.condicionpago==12){let e=this.formatearFecha(a.setDate(a.getDate()+90));this.diaPagoSinFormatear=a.setDate(a.getDate()+90),this.diaPago=e}if(this.condicionpago==23){let e=this.formatearFecha(a.setDate(a.getDate()+1));this.diaPagoSinFormatear=a.setDate(a.getDate()+1),this.diaPago=e}if(this.condicionpago==32){let e=this.formatearFecha(a.setDate(a.getDate()+60));this.diaPagoSinFormatear=a.setDate(a.getDate()+60),this.diaPago=e}if(this.condicionpago==33){let e=this.formatearFecha(a.setDate(a.getDate()+90));this.diaPagoSinFormatear=a.setDate(a.getDate()+90),this.diaPago=e}if(this.condicionpago==35){let e=this.formatearFecha(a.setDate(a.getDate()+70));this.diaPagoSinFormatear=a.setDate(a.getDate()+70),this.diaPago=e}if(this.condicionpago==29){let e=this.formatearFecha(a.setDate(a.getDate()+90));this.diaPagoSinFormatear=a.setDate(a.getDate()+90),this.diaPago=e}this.condicionpago!=39&&this.condicionpago!=26&&this.condicionpago!=25&&this.condicionpago!=30&&this.condicionpago!=17&&this.condicionpago!=20&&this.condicionpago!=18&&this.condicionpago!=34&&this.condicionpago!=24&&this.condicionpago!=19&&this.condicionpago!=22&&this.condicionpago!=10&&this.condicionpago!=27&&this.condicionpago!=16&&this.condicionpago!=36&&this.condicionpago!=14&&this.condicionpago!=28&&this.condicionpago!=37&&this.condicionpago!=38&&this.condicionpago!=12&&this.condicionpago!=23&&this.condicionpago!=32&&this.condicionpago!=33&&this.condicionpago!=35&&this.condicionpago!=29&&(this.diaPago=null)},formatearFecha(a){let e=new Date(a);return this.diaPagoSinFormatear=e.getUTCDate(),e.toLocaleDateString()},async onSubmit(){if(this.condicionpago==null)E({type:"error",message:"\xA1Se debe seleccionar forma de pago!"});else{this.loadingBtnGuardar=!0;let a={idProveedor:this.idProveedor,idPresupuestacion:this.idPresupuestacion,totalPP:this.totalPP,precioFlete:this.precioFlete,proveedor_monto_factura_A:this.montoIVA,descuentosyBonificaciones:this.descuentosyBonificaciones,totalHomogeneo:this.totalHomogeneo,arrProductosProveedores:JSON.stringify(this.arrayInformacionParaCarga)};this.opcionesFacturaA.forEach(e=>{(this.facturaA==e.value||this.facturaA==e.label)&&(a.facturaA=e.value)}),this.arrayCondicionesPago.forEach(e=>{(this.condicionpago===e.condicionpago_nombre||this.condicionpago===e.condicionpago_id)&&(a.condicionpago=e.condicionpago_id)}),await this.axios.post("/api/presupuestacionproductosproveedor/crear",a).then(e=>{e&&(E({type:"success",message:"\xA1Carga realizada con \xE9xito!"}),this.loadingBtnGuardar=!1)})}},classChecker({row:a,column:e}){e.property=="pp"},formatearFecha(a){return new Date(a).toLocaleDateString()}}},z=u("h1",null,"Carga de los productos por el proveedor",-1),M={key:0},O={key:0},R={key:0},q={key:1,style:{"margin-top":"20px"}},j=u("span",{style:{"text-align":"center"}},"Total PP",-1),J=u("span",null,"Forma de pago",-1),Y=u("span",null,"\xBFEntrega factura A?",-1),K=u("span",{style:{"text-align":"center"}},"Monto desc. x IVA",-1),Q=u("span",{style:{"text-align":"center"}},"Flete",-1),W=h("Referencias"),X=u("span",{style:{"text-align":"center"}},"Desc. y bonif. (en nros. neg.)",-1),Z=u("b",null,"PNG:",-1),$=h(" Precio neto gravado"),aa=u("b",null,"PU:",-1),ea=h(" Precio unitario"),oa=u("b",null,"PP:",-1),ta=h(" Precio parcial"),ia=u("span",{style:{"text-align":"center"}},"Total",-1),ra={class:"contenedorBtnSiguienteAtras"},na=h(" Guardar ");function sa(a,e,n,d,r,c){const v=p("el-alert"),b=p("el-tag"),y=p("el-descriptions-item"),U=p("el-descriptions"),m=p("el-table-column"),f=p("el-input-number"),I=p("el-option"),C=p("el-select"),N=p("el-table"),s=p("el-col"),D=p("el-row"),V=p("el-tooltip"),T=p("el-button"),G=p("el-card"),w=H("loading");return g(),_("main",null,[o(G,null,{header:i(()=>[z]),default:i(()=>[B((g(),_("div",null,[r.datosProveedor?(g(),_("div",M,[r.deshabilitarPorFecha==!0?(g(),_("div",O,[o(v,{title:"Informaci\xF3n importante",type:"warning",description:"Ya no podr\xE1 modificar ninguno de los datos debido a que ya se super\xF3 la fecha l\xEDmite de carga","show-icon":"",closable:!1,effect:"light"})])):F("",!0),o(U,{title:"Datos del proveedor",column:4,border:"",style:{"margin-top":"15px"},size:"large"},{default:i(()=>[o(y,{label:"Proveedor","label-align":"center",align:"center"},{default:i(()=>[o(b,{size:"large",type:"primary"},{default:i(()=>[u("b",null,P(r.datosProveedor.proveedor_nombre),1)]),_:1})]),_:1}),o(y,{label:"Mail","label-align":"center",align:"center"},{default:i(()=>[o(b,{size:"large",type:"primary"},{default:i(()=>[u("b",null,P(r.datosProveedor.proveedor_mail),1)]),_:1})]),_:1}),o(y,{label:"Rubro","label-align":"center",align:"center"},{default:i(()=>[o(b,{size:"large",type:"success"},{default:i(()=>[h(P(r.datosGenerales.presupuestacion_rubro_nombre),1)]),_:1})]),_:1}),o(y,{label:"Fecha l\xEDmite","label-align":"center",align:"center"},{default:i(()=>[o(b,{size:"large",type:"success"},{default:i(()=>[h(P(c.formatearFecha(r.fechaLimiteCarga)),1)]),_:1})]),_:1})]),_:1})])):F("",!0)])),[[w,r.loadingDatosProveedor]]),B((g(),_("div",null,[r.deshabilitarPorFecha!=!0?(g(),_("div",R,[o(v,{title:"Informaci\xF3n importante",type:"success",description:"En caso de que trabaje con una unidad de medida distinta a la que se muestra en cada uno de los productos, por favor realice la conversi\xF3n correspondiente","show-icon":"",closable:!1,effect:"light",style:{"margin-top":"15px"}})])):F("",!0),r.arrayInformacionParaCarga?(g(),_("div",q,[o(N,{data:r.arrayInformacionParaCarga,stripe:"",style:{width:"100%","margin-top":"15px"},"cell-class-name":c.classChecker,"summary-method":c.getSummaries,"show-summary":""},{default:i(()=>[o(m,{prop:"nombre",label:"Nombre","min-width":"150"},{default:i(t=>[h(P(t.row.producto_nombre),1)]),_:1}),o(m,{prop:"unidadMedida",label:"Un. medida","min-width":"150"},{default:i(t=>[h(P(t.row.producto_unidad),1)]),_:1}),o(m,{prop:"observaciones",label:"Observaciones","min-width":"150"},{default:i(t=>[h(P(t.row.observaciones),1)]),_:1}),o(m,{prop:"cantidad",label:"Cantidad"},{default:i(t=>[h(P(t.row.producto_cantidad_a_comprar),1)]),_:1}),o(m,{prop:"png",label:"PNG ($)",align:"center"},{default:i(t=>[o(f,{modelValue:t.row.precio_png,"onUpdate:modelValue":l=>t.row.precio_png=l,controls:!1,style:{width:"100%"},onChange:l=>c.calcularPrecioPP(t),disabled:r.deshabilitarPorFecha},null,8,["modelValue","onUpdate:modelValue","onChange","disabled"])]),_:1}),o(m,{prop:"iva",label:"IVA (%)",align:"center"},{default:i(t=>[o(C,{modelValue:t.row.iva,"onUpdate:modelValue":l=>t.row.iva=l,placeholder:"Seleccione",style:{width:"100%"},onChange:l=>c.calcularPrecioPP(t),disabled:r.deshabilitarPorFecha},{default:i(()=>[(g(!0),_(A,null,x(r.opcionesIVA,l=>(g(),S(I,{key:l.value,label:l.label,value:l.value},null,8,["label","value"]))),128))]),_:2},1032,["modelValue","onUpdate:modelValue","onChange","disabled"])]),_:1}),o(m,{prop:"montoIva",label:"Total IVA ($)",align:"center"},{default:i(t=>[o(f,{modelValue:t.row.total_iva,"onUpdate:modelValue":l=>t.row.total_iva=l,controls:!1,style:{width:"100%"},disabled:""},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),o(m,{prop:"pu",label:"PU ($)",align:"center"},{default:i(t=>[o(f,{modelValue:t.row.precio_pu,"onUpdate:modelValue":l=>t.row.precio_pu=l,controls:!1,style:{width:"100%"},disabled:""},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),o(m,{prop:"pp",label:"PP ($)",align:"center"},{default:i(t=>[o(f,{modelValue:t.row.precio_pp,"onUpdate:modelValue":l=>t.row.precio_pp=l,controls:!1,style:{width:"100%"},disabled:""},null,8,["modelValue","onUpdate:modelValue"])]),_:1})]),_:1},8,["data","cell-class-name","summary-method"]),o(D,{gutter:10,style:{"margin-top":"15px"}},{default:i(()=>[o(s,{span:3}),o(s,{span:3}),o(s,{span:3}),o(s,{span:6}),o(s,{span:3}),o(s,{span:3}),o(s,{span:3},{default:i(()=>[j,o(f,{controls:!1,modelValue:r.totalPP,"onUpdate:modelValue":e[0]||(e[0]=t=>r.totalPP=t),style:{width:"100%"},disabled:"",onChange:e[1]||(e[1]=t=>c.calcularTotalHomegeno())},null,8,["modelValue"])]),_:1})]),_:1}),o(D,{gutter:10,style:{"margin-top":"10px"}},{default:i(()=>[o(s,{span:3}),o(s,{span:3}),o(s,{span:3}),o(s,{span:3}),o(s,{span:6},{default:i(()=>[J,o(C,{modelValue:r.condicionpago,"onUpdate:modelValue":e[2]||(e[2]=t=>r.condicionpago=t),placeholder:"Forma de pago",style:{width:"100%"},filterable:"",onChange:e[3]||(e[3]=t=>c.cambiaCondicionPago()),disabled:r.deshabilitarPorFecha},{default:i(()=>[(g(!0),_(A,null,x(r.arrayCondicionesPago,t=>(g(),S(I,{key:t.condicionpago_id,label:t.condicionpago_nombre,value:t.condicionpago_id},null,8,["label","value"]))),128))]),_:1},8,["modelValue","disabled"])]),_:1}),o(s,{span:3},{default:i(()=>[o(V,{class:"box-item",effect:"dark",content:"Para el caso de que el proveedor no entregue factura, introduzca en la celda adyacente a la derecha el importe de ahorro de IVA en n\xFAmeros negativos",placement:"top-start"},{default:i(()=>[Y]),_:1}),o(C,{modelValue:r.facturaA,"onUpdate:modelValue":e[4]||(e[4]=t=>r.facturaA=t),placeholder:"Seleccione",style:{width:"100%"},onChange:e[5]||(e[5]=t=>c.cambiarDisabledEmiteFactura()),disabled:r.deshabilitarPorFecha},{default:i(()=>[(g(!0),_(A,null,x(r.opcionesFacturaA,t=>(g(),S(I,{key:t.value,label:t.label,value:t.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue","disabled"])]),_:1}),o(s,{span:3},{default:i(()=>[K,o(f,{controls:!1,modelValue:r.montoIVA,"onUpdate:modelValue":e[6]||(e[6]=t=>r.montoIVA=t),style:{width:"100%"},disabled:r.disabledEmiteFactura,onChange:e[7]||(e[7]=t=>c.calcularTotalHomegeno()),max:0},null,8,["modelValue","disabled"])]),_:1})]),_:1}),o(D,{gutter:10,style:{"margin-top":"10px"}},{default:i(()=>[o(s,{span:3}),o(s,{span:3}),o(s,{span:3}),o(s,{span:3}),o(s,{span:6}),o(s,{span:3}),o(s,{span:3},{default:i(()=>[o(V,{class:"box-item",effect:"dark",content:"Flete del proveedor o terceros transportistas. SI EL FLETE EST\xC1 INCLUIDO NO INGRESAR NINGUN IMPORTE",placement:"left-end"},{default:i(()=>[Q]),_:1}),o(f,{controls:!1,modelValue:r.precioFlete,"onUpdate:modelValue":e[8]||(e[8]=t=>r.precioFlete=t),style:{width:"100%"},min:0,onChange:e[9]||(e[9]=t=>c.calcularTotalHomegeno()),disabled:r.deshabilitarPorFecha},null,8,["modelValue","disabled"])]),_:1})]),_:1}),o(D,{gutter:10,style:{"margin-top":"10px"}},{default:i(()=>[o(s,{span:3},{default:i(()=>[W]),_:1}),o(s,{span:3}),o(s,{span:3}),o(s,{span:3}),o(s,{span:6}),o(s,{span:3}),o(s,{span:3},{default:i(()=>[o(V,{class:"box-item",effect:"dark",content:"Bonificaciones por conceptos comerciales, como por ejemplo: Bonificaci\xF3n por gran volumen de compra, descuentos por conceptos financieros, etc",placement:"left-end"},{default:i(()=>[X]),_:1}),o(f,{controls:!1,modelValue:r.descuentosyBonificaciones,"onUpdate:modelValue":e[10]||(e[10]=t=>r.descuentosyBonificaciones=t),style:{width:"100%"},onChange:e[11]||(e[11]=t=>c.calcularTotalHomegeno()),disabled:r.deshabilitarPorFecha,max:0},null,8,["modelValue","disabled"])]),_:1})]),_:1}),o(D,{gutter:10,style:{"margin-top":"10px"}},{default:i(()=>[o(s,{span:3},{default:i(()=>[Z,$]),_:1}),o(s,{span:3},{default:i(()=>[aa,ea]),_:1}),o(s,{span:3},{default:i(()=>[oa,ta]),_:1}),o(s,{span:3}),o(s,{span:6}),o(s,{span:3}),o(s,{span:3},{default:i(()=>[ia,o(f,{controls:!1,modelValue:r.totalHomogeneo,"onUpdate:modelValue":e[12]||(e[12]=t=>r.totalHomogeneo=t),style:{width:"100%"},min:0,disabled:"",align:"center","text-align":"center"},null,8,["modelValue"])]),_:1})]),_:1})])):F("",!0),u("div",ra,[o(T,{type:"primary",class:"btnSiguiente",onClick:e[13]||(e[13]=t=>c.onSubmit()),loading:r.loadingBtnGuardar,disabled:r.deshabilitarPorFecha},{default:i(()=>[na]),_:1},8,["loading","disabled"])])])),[[w,r.loadingArrayInformacionParaCarga]])]),_:1})])}var ca=k(L,[["render",sa]]);export{ca as default};
