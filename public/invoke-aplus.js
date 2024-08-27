document.addEventListener('DOMContentLoaded', () => {
  const renderContainer = document.querySelector('bean-rich-text')
    ? document.querySelector('bean-rich-text').shadowRoot
    : document.querySelector('#mkt-aplus');
  console.log(renderContainer);
  if (renderContainer) {
    renderContainer.classList.add(
      renderContainer.clientWidth < 768 ? 'mobile' : 'pc',
    );
    function initMultipleModule() {
      renderContainer
        .querySelectorAll('.mkt-multiple-image-text')
        .forEach((module) => {
          const smallItemList = module.querySelectorAll('.small-image>div');
          const bigImageList = module.querySelectorAll('.big-image img');
          const goodsDescList = module.querySelectorAll(
            '.goods-desc .goods-item',
          );

          let bigImageDom = bigImageList.item(0);
          let goodsDescDom = goodsDescList.item(0);
          let smallDom = smallItemList.item(0);
          smallItemList.forEach((dom, index) => {
            dom.addEventListener('click', () => {
              const bigDom = bigImageList.item(index);
              const goodsDesc = goodsDescList.item(index);
              smallDom.classList.remove('active');
              goodsDescDom.classList.remove('active');
              bigImageDom.classList.remove('active');

              dom.classList.add('active');
              bigDom.classList.add('active');
              goodsDesc.classList.add('active');

              smallDom = dom;
              bigImageDom = bigDom;
              goodsDescDom = goodsDesc;
            });
          });
        });
    }

    initMultipleModule();
  }
});
