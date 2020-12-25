class AddAccountNameToUsers < ActiveRecord::Migration[6.0]
  def change
      add_column :users, :account_name, :string, null: false, default: ""
      add_index :users, :account_name, unique: true
  end
end
