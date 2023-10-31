"""create currency table

Revision ID: ff9b85d8ebeb
Revises: 651430bab4e1
Create Date: 2023-10-31 17:13:35.429916

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ff9b85d8ebeb'
down_revision: Union[str, None] = '651430bab4e1'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'currency',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('name', sa.String(128), nullable=False)
    )


def downgrade() -> None:
    op.drop_table('currency')
