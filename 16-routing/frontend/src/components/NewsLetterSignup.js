import { useEffect } from 'react';
import { useFetcher } from 'react-router-dom';

import classes from './NewsLetterSignup.module.css';

function NewsletterSignup() {
   const fetcher = useFetcher();
   const { data, state } = fetcher;
   //useFetcher()를 통해 얻은 객체는 submit(), formAction()등 여러가지 메소드를 사용할 수 있는데,
   //submit, formAction 등등의 기능들이 성공여부를 알리거나,
   //data를 통해 해당 프로퍼티에 접근할 수 있음

   useEffect(() => {
      if (state === 'idle' && data && data.message) {
         window.alert(data.message);
      }
   }, [data, state]);

   return (
      //fetcher.Form은 일반 Form과는 다르게 실제 실행할 액션을 트리거하는 부분에서는 동일하지만,
      //라우트 전환을 실행하지 않고 트리거함
      //=> loader/action함수의 도움으로 loader/action을 트리거한 후,
      //   실제로 사용하려는 ㅣoader/action이 속한 페이지로 이동하지 않을 때 사용함
      <fetcher.Form
         method="post"
         action="/newsLetter" //action속성을 통해 어떤 아이디를 가진 라우트의 액션을 트리거한다는 것을 알림
         className={classes.newsletter}
      >
         <input
            type="email"
            placeholder="Sign up for newsletter..."
            aria-label="Sign up for newsletter"
         />
         <button>Sign up</button>
      </fetcher.Form>
   );
}

export default NewsletterSignup;
