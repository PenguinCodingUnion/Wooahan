## SQLite를 사용하여 데이터 저장

데이터베이스에 데이터를 저장하는 작업은 연락처 정보와 같이 반복적이거나 구조화된 데이터에 이상적입니다. 이 페이지에서는 개발자가 일반적으로 SQL 데이터베이스를 잘 알고 있다고 가정하며 Android에서 SQLite 데이터베이스를 시작하는 데 도움이 되는 유용한 정보를 제공합니다. Android에서 데이터베이스를 사용할 때 필요한 API는 android.database.sqlite 패키지로 제공됩니다.

### 스키마 및 계약의 정의

SQL 데이터베이스의 기본 원칙 중 하나는 스키마입니다. 스키마는 데이터베이스의 구성 체계에 관한 공식적인 선언입니다. 스키마는 개발자가 데이터베이스를 생성할 때 사용하는 SQL 문에 반영됩니다. 체계적인 자체 문서화 방식으로 스키마의 레이아웃을 명시적으로 지정하는 계약 클래스라고 하는 컴패니언 클래스를 생성하면 도움이 될 수 있습니다.

계약 클래스는 URI, 테이블 및 열의 이름을 정의하는 상수를 유지하는 컨테이너입니다. 계약 클래스를 통해 동일한 패키지의 다른 모든 클래스에 동일한 상수를 사용할 수 있습니다. 이렇게 하면 어느 한 곳에서 열 이름을 변경하고 이 변경사항을 코드 전체에 전파할 수 있습니다.

계약 클래스를 구성하는 좋은 방법은 클래스의 루트 수준에 있는 데이터베이스 전체에 전역적인 정의를 추가하는 것입니다. 그런 다음 각 테이블의 내부 클래스를 생성합니다. 각 내부 클래스는 상응하는 테이블의 열을 열거합니다.

예를 들어 다음 계약은 테이블 이름과 RSS 피드를 나타내는 단일 테이블의 열 이름을 정의합니다.

```
object FeedReaderContract {
    // Table contents are grouped together in an anonymous object.
    object FeedEntry : BaseColumns {
        const val TABLE_NAME = "entry"
        const val COLUMN_NAME_TITLE = "title"
        const val COLUMN_NAME_SUBTITLE = "subtitle"
    }
}
```

### SQL Helper를 사용하여 데이터베이스 생성

데이터베이스의 모양을 정의한 후에는 데이터베이스 및 테이블을 생성 및 유지하는 메서드를 구현해야 합니다. 다음은 테이블을 생성하고 삭제하는 일반적인 구문입니다.

```
private const val SQL_CREATE_ENTRIES =
        "CREATE TABLE ${FeedEntry.TABLE_NAME} (" +
                "${BaseColumns._ID} INTEGER PRIMARY KEY," +
                "${FeedEntry.COLUMN_NAME_TITLE} TEXT," +
                "${FeedEntry.COLUMN_NAME_SUBTITLE} TEXT)"

private const val SQL_DELETE_ENTRIES = "DROP TABLE IF EXISTS ${FeedEntry.TABLE_NAME}"
```

기기의 내부 저장소에 저장한 파일과 마찬가지로 Android는 데이터베이스를 앱의 비공개 폴더에 저장합니다. 기본적으로 이 공간은 다른 앱이나 사용자가 액세스할 수 없기 때문에 저장된 데이터는 안전하게 유지됩니다.

SQLiteOpenHelper 클래스에는 데이터베이스 관리를 위한 유용한 API 세트가 포함되어 있습니다. 이 클래스를 사용하여 데이터베이스의 참조를 가져오면 시스템은 앱이 시작되고 있는 동안이 아닌 필요한 때에만 데이터베이스 생성 및 업데이트와 같이 장시간 실행될 수 있는 작업을 실행합니다. 개발자는 getWritableDatabase() 또는 getReadableDatabase()를 호출하기만 하면 됩니다.

SQLiteOpenHelper를 사용하려면 onCreate() 및 onUpgrade() 콜백 메서드를 재정의하는 서브클래스를 생성해야 합니다. 또한 onDowngrade() 또는 onOpen() 메서드를 구현할 수도 있지만 이러한 메서드가 필수는 아닙니다.

예를 들어 다음은 위에 나와 있는 명령어 중 일부를 사용하는 SQLiteOpenHelper의 구현입니다.

```
class FeedReaderDbHelper(context: Context) : SQLiteOpenHelper(context, DATABASE_NAME, null, DATABASE_VERSION) {
    override fun onCreate(db: SQLiteDatabase) {
        db.execSQL(SQL_CREATE_ENTRIES)
    }
    override fun onUpgrade(db: SQLiteDatabase, oldVersion: Int, newVersion: Int) {
        // This database is only a cache for online data, so its upgrade policy is
        // to simply to discard the data and start over
        db.execSQL(SQL_DELETE_ENTRIES)
        onCreate(db)
    }
    override fun onDowngrade(db: SQLiteDatabase, oldVersion: Int, newVersion: Int) {
        onUpgrade(db, oldVersion, newVersion)
    }
    companion object {
        // If you change the database schema, you must increment the database version.
        const val DATABASE_VERSION = 1
        const val DATABASE_NAME = "FeedReader.db"
    }
}
```

데이터베이스에 액세스하려면 다음과 같이 SQLiteOpenHelper의 서브클래스를 인스턴스화합니다.

```
val dbHelper = FeedReaderDbHelper(context)
```

### 데이터베이스에 정보 삽입

다음과 같이 ContentValues 객체를 insert() 메서드에 전달하여 데이터를 데이터베이스에 삽입할 수 있습니다.

```
// Gets the data repository in write mode
val db = dbHelper.writableDatabase

// Create a new map of values, where column names are the keys
val values = ContentValues().apply {
    put(FeedEntry.COLUMN_NAME_TITLE, title)
    put(FeedEntry.COLUMN_NAME_SUBTITLE, subtitle)
}

// Insert the new row, returning the primary key value of the new row
val newRowId = db?.insert(FeedEntry.TABLE_NAME, null, values)
```

insert()의 첫 번째 인수는 단순히 테이블 이름입니다.

두 번째 인수는 ContentValues가 비어 있을 때 즉, 어떤 값도 삽입(put)하지 않았을 때 실행할 작업을 프레임워크에 알려줍니다. 열 이름을 지정하면 프레임워크는 행을 삽입하고 열의 값을 null로 설정합니다. 이 코드 샘플에서와 같이 null을 지정하면 프레임워크는 값이 없을 때 행을 삽입하지 않습니다.

insert() 메서드는 새로 생성된 행의 ID를 반환하거나 데이터 삽입 시 오류가 발생하면 -1을 반환합니다. 오류는 데이터베이스의 기존 데이터와 충돌하는 경우에 발생할 수 있습니다.

### 데이터베이스에서 정보 읽어오기

데이터베이스에서 정보를 읽어오려면 query() 메서드를 사용하고 이 메서드에 선택 기준 및 원하는 열을 전달합니다. 이 메서드는 insert() 및 update()의 요소를 결합하며 단지 열 목록이 삽입할 데이터가 아니라 가져오려는 데이터('프로젝션')를 정의한다는 점만 다릅니다. 쿼리 결과는 Cursor 객체로 반환됩니다.

```
val db = dbHelper.readableDatabase

// Define a projection that specifies which columns from the database
// you will actually use after this query.
val projection = arrayOf(BaseColumns._ID, FeedEntry.COLUMN_NAME_TITLE, FeedEntry.COLUMN_NAME_SUBTITLE)

// Filter results WHERE "title" = 'My Title'
val selection = "${FeedEntry.COLUMN_NAME_TITLE} = ?"
val selectionArgs = arrayOf("My Title")

// How you want the results sorted in the resulting Cursor
val sortOrder = "${FeedEntry.COLUMN_NAME_SUBTITLE} DESC"

val cursor = db.query(
        FeedEntry.TABLE_NAME,   // The table to query
        projection,             // The array of columns to return (pass null to get all)
        selection,              // The columns for the WHERE clause
        selectionArgs,          // The values for the WHERE clause
        null,                   // don't group the rows
        null,                   // don't filter by row groups
        sortOrder               // The sort order
)
```

세 번째 및 네 번째 인수(selection 및 selectionArgs)는 결합되어 WHERE 절을 생성합니다. 인수는 선택 쿼리와 별도로 제공되므로 결합되기 전에 이스케이프됩니다. 그러면 선택 문이 SQL 삽입의 영향을 받지 않습니다. 모든 인수에 관한 자세한 내용은 query() 참조에서 확인하세요.

커서의 행을 알아보려면 Cursor 이동 메서드 중 하나를 사용합니다. 이 메서드는 항상 값 읽기를 시작하기 전에 먼저 호출해야 합니다. 커서는 -1 위치에서 시작하므로 moveToNext()를 호출하면 결과의 첫 번째 항목에 '읽기 위치'가 배치되고 커서가 결과 세트의 마지막 항목을 이미 지나갔는지 여부가 반환됩니다. 각 행에 관해 getString() 또는 getLong()과 같은 Cursor get 메서드 중 하나를 호출함으로써 열의 값을 읽어올 수 있습니다. 각 get 메서드에서 원하는 열의 색인 위치를 전달해야 하며 이 위치는 getColumnIndex() 또는 getColumnIndexOrThrow()를 호출하여 가져올 수 있습니다. 결과 전체에 걸친 반복이 완료되면 커서의 close()를 호출하여 리소스를 해제합니다. 예를 들어 다음은 커서에 저장된 모든 항목 ID를 가져와서 목록에 추가하는 방법을 보여줍니다.

```
val itemIds = mutableListOf<Long>()
with(cursor) {
    while (moveToNext()) {
        val itemId = getLong(getColumnIndexOrThrow(BaseColumns._ID))
        itemIds.add(itemId)
    }
}
cursor.close()
```

### 데이터베이스에서 정보 삭제

테이블에서 행을 삭제하려면 행을 식별하는 선택 기준을 delete() 메서드에 제공해야 합니다. 이 메커니즘은 query() 메서드에 관한 선택 인수와 동일하게 작동합니다. 그리고 이 메커니즘은 선택 사양을 선택 절 및 선택 인수로 나눕니다. 절은 보려는 열을 정의하며 절을 통해 열 테스트를 결합할 수도 있습니다. 인수는 절 안에 묶여 테스트되는 값입니다. 결과는 일반 SQL 문과 동일하게 처리되지 않기 때문에 SQL 삽입의 영향을 받지 않습니다.

```
// Define 'where' part of query.
val selection = "${FeedEntry.COLUMN_NAME_TITLE} LIKE ?"
// Specify arguments in placeholder order.
val selectionArgs = arrayOf("MyTitle")
// Issue SQL statement.
val deletedRows = db.delete(FeedEntry.TABLE_NAME, selection, selectionArgs)
```

delete() 메서드의 반환 값은 데이터베이스에서 삭제된 행 수를 나타냅니다.

### 데이터베이스 업데이트

데이터베이스 값의 일부를 수정해야 한다면 update() 메서드를 사용합니다.

테이블을 업데이트하면 insert()의 ContentValues 구문과 delete()의 WHERE 구문이 결합됩니다.

```
val db = dbHelper.writableDatabase

// New value for one column
val title = "MyNewTitle"
val values = ContentValues().apply {
    put(FeedEntry.COLUMN_NAME_TITLE, title)
}

// Which row to update, based on the title
val selection = "${FeedEntry.COLUMN_NAME_TITLE} LIKE ?"
val selectionArgs = arrayOf("MyOldTitle")
val count = db.update(
        FeedEntry.TABLE_NAME,
        values,
        selection,
        selectionArgs)
```

update() 메서드의 반환 값은 데이터베이스에서 영향받는 행의 수입니다.

### 데이터베이스 연결 유지

데이터베이스가 닫혀 있을 때 getWritableDatabase() 및 getReadableDatabase() 호출에는 리소스가 많이 사용되므로 데이터베이스에 액세스해야 하는 동안에는 최대한 데이터베이스 연결을 열린 상태로 두어야 합니다. 일반적으로 호출 활동의 onDestroy()에서 데이터베이스를 닫는 것이 가장 좋습니다.

```
override fun onDestroy() {
    dbHelper.close()
    super.onDestroy()
}
```

### 데이터베이스 디버그

Android SDK에는 sqlite3 셸 도구가 포함되어 있습니다. 이 도구를 통해 SQLite 데이터베이스에서 테이블 콘텐츠를 찾아보고 SQL 명령어를 실행하며 기타 유용한 기능을 실행할 수 있습니다. 자세한 내용은 셸 명령어 실행 방법을 참조하세요.
