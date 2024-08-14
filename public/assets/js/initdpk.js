
$(document).on('ready', function () {
  // INITIALIZATION OF DATERANGEPICKER
  // =======================================================
  $('.js-daterangepicker').daterangepicker();

  $('.js-daterangepicker-times').daterangepicker({
    timePicker: true,
    startDate: moment().startOf('hour'),
    endDate: moment().startOf('hour').add(32, 'hour'),
    locale: {
      format: 'M/DD hh:mm A'
    }
  });

  var start = moment();
  var end = moment();

  function cb(start, end) {
    $('#js-daterangepicker-predefined .js-daterangepicker-predefined-preview').html(start.format('MMM D') + ' - ' + end.format('MMM D, YYYY'));
  }

  $('#js-daterangepicker-predefined').daterangepicker({
    startDate: start,
    endDate: end,
    ranges: {
      'Today': [moment(), moment()],
      'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Last 7 Days': [moment().subtract(6, 'days'), moment()],
      'Last 30 Days': [moment().subtract(29, 'days'), moment()],
      'This Month': [moment().startOf('month'), moment().endOf('month')],
      'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    }
  }, cb);

  cb(start, end);
});


// INITIALIZATION OF DATATABLES
// =======================================================
HSCore.components.HSDatatables.init($('#datatable'), {
  select: {
    style: 'multi',
    selector: 'td:first-child input[type="checkbox"]',
    classMap: {
      checkAll: '#datatableCheckAll',
      counter: '#datatableCounter',
      counterInfo: '#datatableCounterInfo'
    }
  },
  language: {
    zeroRecords: `<div class="text-center p-4">
          <img class="mb-3" src="./assets/svg/illustrations/oc-error.svg" alt="Image Description" style="width: 10rem;" data-hs-theme-appearance="default">
          <img class="mb-3" src="./assets/svg/illustrations-light/oc-error.svg" alt="Image Description" style="width: 10rem;" data-hs-theme-appearance="dark">
        <p class="mb-0">No data to show</p>
        </div>`
  }
});

const datatable = HSCore.components.HSDatatables.getItem(0)

document.querySelectorAll('.js-datatable-filter').forEach(function (item) {
  item.addEventListener('change',function(e) {
    const elVal = e.target.value,
targetColumnIndex = e.target.getAttribute('data-target-column-index'),
targetTable = e.target.getAttribute('data-target-table');

HSCore.components.HSDatatables.getItem(targetTable).column(targetColumnIndex).search(elVal !== 'null' ? elVal : '').draw()
  })
})
