import { AppConfig } from 'src/configs';

export interface Menus{
  id: number;
  parentId: number;
  title: string;
  positionId: number;
  ordering: number;
  url: string;
  param: string;
  state: number;
  children: any[];
}

export const removeExtension = (filename: string) => {
  return filename.split('.').slice(0, -1).join('.');
};

export const getCrumbs = (menus: any, path: string | undefined): any[] => {
  let crumbs: any[] = [];
  if (!path) {
    return crumbs;
  }

  const segment = path.slice(1).split('/')
  const segmentLast = segment[segment.length-1]
  var segmentPath = "/";
  if(segmentLast !== 'form' && segmentLast.replace(/[^0-9]/g, "") === ""){
    for(var i=0; i < segment.length; i++) {
      if(i+1 !== segment.length){
        segmentPath+= `${segment[i]}/`
      }else{
        segmentPath+= `${segment[i]}`
      }
    }
  }else{
    for(i=0; i < segment.length-1; i++) {
      if(i+1 !== segment.length-1){
        segmentPath+= `${segment[i]}/`
      }else{
        segmentPath+= `${segment[i]}`
      }
    }
  }
  
  if(menus.length > 0){
    crumbs.push({ title: 'Home', link : '/' })
    const children_one = menus.filter((i: any) => i.url === segmentPath)[0];
    if(children_one === undefined){
      menus.forEach((item: any) => {
        const search = item.url.search(segmentPath)
        if(search === -1 && item.children.length > 0){
          const children_one = item.children.filter((i: any) => i.url === segmentPath)[0]
          if(children_one !== undefined && Object.keys(children_one).length > 0){
            if(children_one.parent_info !== undefined){
              crumbs.push({ title: children_one.parent_info.title });
              crumbs.push({ title: children_one.title, link: children_one.url });
              if(segmentLast.search('form') !== -1){
                crumbs.push({ title: 'สร้างแบบฟอร์ม', link: '#' });
              }else if(segmentLast.replace(/[^0-9]/g, "") !== ""){
                crumbs.push({ title: 'แก้ไขแบบฟอร์ม', link: '#' });
              }
            }
          }
        }
      })
    }else{
      crumbs.push({ title: children_one.title, link: children_one.url })
    }
  }
  return crumbs;
};

if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
}

export const isLoginScreen =
  process.env.NODE_ENV === 'development'
    ? window.location.origin === 'http://localhost:3000' && (AppConfig.app as any).login === true
    : window.location.origin === process.env.REACT_APP_WEB_AUTHEN_HOST;
